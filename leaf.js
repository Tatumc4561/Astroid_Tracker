import usaStateBoundaries from "./USAstateBoundaries.js";

// initial load point ----------------
var map = L.map("map").setView([36, -103], 4);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// blip marker ------------------------
// var marker = L.marker([36, -103]).addTo(map);

// // circle -----------------------------
// var circle = L.circle([51.508, -0.11], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 500,
// }).addTo(map);

var geojsonLayer = L.geoJSON(usaStateBoundaries);
geojsonLayer.addTo(map);

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

// var popup = L.popup();

// popups for areas outside of designated areas
// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }

// map.on("click", onMapClick);
