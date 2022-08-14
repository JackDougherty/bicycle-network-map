# bicycle-network-map
Bicycle Network Map IN-PROGRESS, revised for BikeWestHartford.org

## live map
https://jackdougherty.github.io/bicycle-network-map

## TODO
- Finalize Legend
  - decide whether to distinguish between Multi-Use Trail (wide) versus Path (narrow)
  - decide if or how to display other types (unpaved, proposed)
  - show line colors/weights/dashArray in legend, similar to https://jackdougherty.github.io/bikemapcode/newbritain.html

### Designated Infrastructure (as of DATE)
  - path - Protected Paths - dark green line
  - lane - Dedicated Bike Lane - medium green line
  - shared - Shared with cars (Sharrows) - dotted light line
  - mixed  - Mixed (Lane one side, Sharrow other) - dash med green
  - proposed - Proposed (Trout Brook Trail only) - gray
  - unpaved - Unpaved or Dirt Trails - gray (or light brown later?)

- add toggle for town boundaries, off by default
- add to and from WH
- convert Hartford names to proper capitalization
- ground review WH north side and Farmington Ave
- ground review Hartford
- ground review MDC WH
- decide if best label is "manager" or "town" or use both
- add DEEP Bicycling Trails? https://data.ct.gov/dataset/Bicycling-Permitted/my8k-w4e6

## data
- Public download https://app.placemark.io/public/wCRAP2DACjNUsCdeS9AeP
- Bicycle Network Map by Department of Community Development, Town of West Hartford (including MDC bike lanes located inside town border) map PDF last updated 25 May 2019, https://resources.finalsite.net/images/v1650896925/westhartfordctgov/lnsf6colmpygurg2j6xa/WHBicycleRoutes.pdf, Shapefiles provided in August 2022 by Information Technology Director, Town of West Hartford and AppGeo, based on 2019 GIS map, https://appgeo.sharefile.com/share/view/s4cec5dd8d9b54591856f6e6f178504c6
- City of Hartford Bike Routes downloaded Aug 2022 https://openhartford-hartfordgis.opendata.arcgis.com/datasets/bike-routes/explore?location=41.775340%2C-72.674067%2C13.00  IMPORTANT: Since Hartford marks bike lanes on both sides, removed one side to match West Hartford (for centerline distance). Also changed Hartford column headers and field names to match (Bike Lane to lane, etc.)
