// set up the map center and zoom level
var map = L.map('map', {
  center: [41.762, -72.742],
  zoom: 13,
  zoomControl: false, // add later to reposition
  scrollWheelZoom: false
});

// set bounds for geocoder
var minLatLng = [41.71455, -72.7933];
var maxLatLng = [41.8194, -72.626];
var bounds = L.latLngBounds(minLatLng, maxLatLng);

var bikeNetworkLayer;

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/wh-bicycle-network-map">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

L.control.scale().addTo(map);

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

/* BASELAYERS */
// use common baselayers below, delete, or add more with plain JavaScript from http://leaflet-extras.github.io/leaflet-providers/preview/
// .addTo(map); -- suffix displays baselayer by default
// controlLayers.addBaseLayer (variableName, 'label'); -- adds baselayer and label to legend; omit if only one baselayer with no toggle desired
var lightAll = new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map); // adds layer by default
controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll');

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});
controlLayers.addBaseLayer(Esri_WorldStreetMap, 'Esri World Street Map');

// Esri satellite map from http://leaflet-extras.github.io/leaflet-providers/preview/
// OR use esri-leaflet plugin and esri basemap name https://esri.github.io/esri-leaflet/examples/switching-basemaps.html
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
controlLayers.addBaseLayer(Esri_WorldImagery, 'Esri World Imagery');

// create styles  https://www.w3schools.com/colors/colors_names.asp
var bikeNetworkStyle = function(f) {
  var type2color = {
    'path': 'darkgreen',
    'lane': 'green',
    'mixed': 'green',
    'shared': 'green'
  },
  type2weight = {
    'path': 4,
    'lane': 3,
    'mixed': 3,
    'shared': 2
  },
  type2dash = {
    'path': 0,
    'lane': 0,
    'mixed': 5,
    'shared': 3
  }

  return {
    'color': type2color[ f.properties.type ] || 'gray', // gray if no data
    'weight': type2weight[ f.properties.type ] || '1', // 1 if no data
    'dashArray':type2dash[ f.properties.type ] || '0', // 0 if no data
  }
}


// load GeoJSON polyline data and display styles
$.getJSON("bicycle-network-draft.geojson", function (data){
  bikeNetworkLayer = L.geoJson(data, {
    style: bikeNetworkStyle,
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.type) // change to match your geojson property labels
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(bikeNetworkLayer, 'All Bike Network');  // insert your 'Title' to add to legend
  map.fitBounds(bikeNetworkLayer.getBounds())
});
