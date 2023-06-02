// set up the map center and zoom level
var map = L.map('map', {
  center: [41.765, -72.715],
  zoom: 13,
  zoomControl: false, // add later to reposition
  scrollWheelZoom: false
});

// create custom pane for town layer, set to display below overlay zIndex 400
map.createPane('towns');
map.getPane('towns').style.zIndex = 350;

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/bikewesthartford/bicycle-network-map">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

L.control.scale({position: "bottomright"}).addTo(map);

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

// add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomleft",
  collapsed: false // false = open by default
}).addTo(map);

// Baselayers https://leaflet-extras.github.io/leaflet-providers/preview/
var CartoDB_LightAll = new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map); // add layer by default
// controlLayers.addBaseLayer(CartoDB_LightAll, 'Street Map light');

// var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
// });
// controlLayers.addBaseLayer(Esri_WorldStreetMap, 'Street Map colored');

// Style lines by color name https://www.w3schools.com/colors/colors_names.asp
// by weight and dashArray https://leafletjs.com/reference.html#polyline
var bikeNetworkStyle = function(f) {
  var type2color = {
    'path': 'darkgreen',
    'lane': 'green',
    'mixed': 'green',
    'blue': 'blue',
    'orange': 'orange',
    'green': 'green'
    // 'shared': 'green'
  },
  type2weight = {
    'path': 5,
    'lane': 2,
    'mixed': 2,
    'green': 2,
    'orange': 2,
    'blue': 2
    // 'shared': 2
  },
  type2dash = {
    'path': 0,
    'lane': 0,
    'mixed': 4,
    'green': 3,
    'orange': 3,
    'blue': 3
    // 'shared': 3
  }
  return {
    'color': type2color[ f.properties.type ] || 'gray', // gray if no data
    'weight': type2weight[ f.properties.type ] || '1', // 1 if no data
    'dashArray':type2dash[ f.properties.type ] || '0', // 0 if no data
  }
}

// load GeoJSON and create each layer using filter by type, matching GeoJSON properties
$.getJSON("bicycle-network-partial.geojson", function (data){

  bikeNetworkLayerPath = L.geoJson(data, {
    style: bikeNetworkStyle,
    filter: function( feature, layer) {
      return feature.properties.type === 'path' ;
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name)
    }
  }).addTo(map);
  controlLayers.addOverlay(bikeNetworkLayerPath, '<i class="path"></i> Protected Path');

  bikeNetworkLayerLane = L.geoJson(data, {
    style: bikeNetworkStyle,
    filter: function( feature, layer) {
      return feature.properties.type === 'lane' ;
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name)
    }
  }).addTo(map);
  controlLayers.addOverlay(bikeNetworkLayerLane, '<i class="lane"></i> Painted Lane');

  bikeNetworkLayerMixed = L.geoJson(data, {
    style: bikeNetworkStyle,
    filter: function( feature, layer) {
      return feature.properties.type === 'mixed' ;
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name)
    }
  }).addTo(map);
  controlLayers.addOverlay(bikeNetworkLayerMixed, '<i class="mixed"></i> Mixed Lane + Sharrow');

  bikeNetworkLayerGreen = L.geoJson(data, {
    style: bikeNetworkStyle,
    filter: function( feature, layer) {
      return feature.properties.type === 'green' ;
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name)
    }
  }).addTo(map);
  controlLayers.addOverlay(bikeNetworkLayerGreen, '<i class="green-loop"></i> Green loop (Hall HS)');

  bikeNetworkLayerOrange = L.geoJson(data, {
    style: bikeNetworkStyle,
    filter: function( feature, layer) {
      return feature.properties.type === 'orange' ;
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name)
    }
  }).addTo(map);
  controlLayers.addOverlay(bikeNetworkLayerOrange, '<i class="orange-loop"></i> Orange loop');

  bikeNetworkLayerBlue = L.geoJson(data, {
    style: bikeNetworkStyle,
    filter: function( feature, layer) {
      return feature.properties.type === 'blue' ;
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name)
    }
  }).addTo(map);
  controlLayers.addOverlay(bikeNetworkLayerBlue, '<i class="blue-loop"></i> Blue loop');

  // town outline layer, with custom pane set to display at lower z-index
  $.getJSON("towns.geojson", function (data){
    var geoJsonLayer = L.geoJson(data, {
      style: function (feature) {
        return {
          'color': 'lightgray',
          'weight': 3,
          'fillColor': '#fff',
          'fillOpacity': 0
        }
      },
      // onEachFeature: function( feature, layer) {
      //   layer.bindPopup(feature.properties.name) // change to match your geojson property labels
      // },
      pane: 'towns'
    }).addTo(map);
    controlLayers.addOverlay(geoJsonLayer, '<i class="town-border"></i> Town borders');
  });

});
