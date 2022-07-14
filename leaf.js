import usaStateBoundaries from "./USAstateBoundaries.js"

// initial load point ----------------
var map = L.map("map").setView([36, -103], 4)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map)

// blip marker  Lake Plataeu ------------------------
var marker = L.marker([45.30793106658124, -110.1210281567377]).addTo(map)

// // circle -----------------------------
// var circle = L.circle([51.508, -0.11], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 500,
// }).addTo(map);

// state boundaries
var geojsonLayer = L.geoJSON(usaStateBoundaries)
geojsonLayer.addTo(map)

// idk?  random geo info
// convert kml to geoJSON
var runLayer = omnivore.kml("geoarea.kml").on("ready", function () {
  map.fitBounds(runLayer.getBounds())

  runLayer.eachLayer(function (layer) {
    layer.bindPopup(layer.feature.properties.description)
  })
})
runLayer.addTo(map)

// recommended areas
// convert kml to geoJSON
var forestBoundary = omnivore
  .kml("AdministrativeForestBoundary.kml")
  .on("ready", function () {
    map.fitBounds(forestBoundary.getBounds())

    forestBoundary.eachLayer(function (layer2) {
      layer2.bindPopup(layer2.feature.properties.description)
    })
  })
forestBoundary.addTo(map)

// polygon ----------------------------

// var polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047],
// ]).addTo(map);

// popups -----------------------------
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// popups that are on initial load
// var popup = L.popup()
//   .setLatLng([51.513, -0.09])
//   .setContent("I am a standalone popup.")
//   .openOn(map);

var popup = L.popup()

// popups for areas outside of designated areas
function onMapClick(e) {
  console.log(e.target)
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map)
}

map.on("click", onMapClick)
