# Bicycle-network-map
Bicycle Network Map for Hartford-West Hartford area by https://BikeWestHartford.org

## Live map
- https://bikewesthartford.github.io/bicycle-network-map
also embedded at
- https://bikewesthartford.org/maps

## Design
To emphasize connectivity, this bicycle network map displays routes drawn from multiple governments:
- City of Hartford
- Town of West Hartford
- Town of Bloomfield
- Town of Newington
- Metropolitan District Commission (MDC)
- CT Transit (Fastrak Multi-Use Trail)

We do this because local governments only map bike routes inside their borders, and the Capital Region Council of Governments (CRCOG) does not yet publish GIS bike routes for the region, but we'd like to encourage them to do so!

For visual simplicity, this map displays each route as a single line. In cases where local government engineering maps show two lines, one on each side of the road, we reduced this to one line.

To prioritize safe bicycle routes, this map displays only three types:
- Protected Path (dark green)
- Painted Lane (light green)
- Mixed Lane + Sharrow, on opposite sides of street (dashed light green)

We track but do not display "shared" routes marked only by sharrows, since these represent inadequate bicycling infrastructure.

TODO - change show popup from click to hover

## Data last updated November 2024
- see `bicycle-network.geojson` file
- edited with free browser tool https://geojson.io or https://Placemark.io
- data columns
  - name
  - type
  - manager
  - to
  - from

## Areas covered so far
- West Hartford
- Hartford
- Bloomfield
- Newington
- small parts of New Britain and Simsbury
- more to come

## Data sources
- field notes, because municipal governments do not always maintain updated records
- Town of West Hartford CT: GIS Mapping System, Bicycle Network, Existing Routes and Recreational Routes https://westhartfordct.mapgeo.io/datasets/properties
- City of Hartford Bike Routes https://openhartford-hartfordgis.opendata.arcgis.com/datasets/bike-routes/explore?location=41.775340%2C-72.674067%2C13.00  
- and City of Hartford Planning Viewer, Bike Routes https://gis1.hartford.gov/Html5Viewer/index.html?viewer=PlanningViewer
IMPORTANT: Since Hartford marks bike lanes on both sides, removed one side to match West Hartford (for centerline distance). Also changed Hartford column headers and field names to match (Bike Lane to lane, etc.)
- Capital Region Council of Governments currently has no bicycle route mapping available on its [Regional Data Portal](https://gis.crcog.org/portal/apps/sites/#/crcog-portal-site) or its [Active Transportation page](https://crcog.org/transportation-planning/multi-modal-planning/complete-streets-active-transportation/)

## TODO
https://data.ct.gov/dataset/Bicycling-Permitted/my8k-w4e6
