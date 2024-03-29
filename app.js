// import API_key from './api.js';
import publicAPI_key from "./publicAPI.js"

let startTime = new Date()
startTime = startTime.toISOString().split("T")[0]

let stopTime = new Date()
stopTime.setDate(stopTime.getDate() + 7)
stopTime = stopTime.toISOString().split("T")[0]

const currentThreats = document.querySelector(".threatnum")
const threatList = document.querySelector(".threatNames")
const threatdateList = document.querySelector(".threatDate")
const threatsizeList = document.querySelector(".threatDiameter")
const threatdistanceList = document.querySelector(".threatDistance")
const threatvelocityList = document.querySelector(".threatVelocity")
const threathazardList = document.querySelector(".threatHazard")

let threatName = []
let threatDate = []
let threatSize = []
let threatDistance = []
let threatVelocity = []
let threatHazard = []

fetch(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startTime}&end_date=${stopTime}&api_key=${publicAPI_key}`
)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // console.log(data.near_earth_objects)
    console.log(data)

    // obtain access to key/values of astroids within specified time, push to global variable
    Object.keys(data.near_earth_objects).forEach(function (key) {
      // console.log(key)
      console.log(data.near_earth_objects[key])

      Object.keys(data.near_earth_objects[key]).forEach(function (amount) {
        // console.log(amount)
        threatName.push(data.near_earth_objects[key][amount]["name"])
        threatDate.push(
          data.near_earth_objects[key][amount].close_approach_data[0]
            .close_approach_date_full
        )
        threatSize.push(
          data.near_earth_objects[key][amount].estimated_diameter["kilometers"]
            .estimated_diameter_max
        )
        threatDistance.push(
          data.near_earth_objects[key][amount].close_approach_data[0]
            .miss_distance["kilometers"]
        )
        threatVelocity.push(
          data.near_earth_objects[key][amount].close_approach_data[0]
            .relative_velocity["kilometers_per_hour"]
        )
        threatHazard.push(
          data.near_earth_objects[key][amount].is_potentially_hazardous_asteroid
        )
      })

      // Threat Count
      currentThreats.innerText = threatName.length
    })

    // Add each astroid name to list
    Object.values(threatName).forEach(function (v) {
      const newItem = document.createElement("li")
      newItem.classList.add("aName")
      newItem.innerText = `${v}`

      threatList.appendChild(newItem)
    })

    Object.values(threatDate).forEach(function (v) {
      const newDate = document.createElement("li")
      newDate.innerText = `${v}`
      threatdateList.appendChild(newDate)
    })

    Object.values(threatSize).forEach(function (v) {
      const newSize = document.createElement("li")
      newSize.innerText = `${v}`
      threatsizeList.appendChild(newSize)
    })

    Object.values(threatDistance).forEach(function (v) {
      const newDistance = document.createElement("li")
      newDistance.innerText = `${v}`
      threatdistanceList.appendChild(newDistance)
    })

    Object.values(threatVelocity).forEach(function (v) {
      const newVelocity = document.createElement("li")
      newVelocity.innerText = `${v}`
      threatvelocityList.appendChild(newVelocity)
    })

    Object.values(threatHazard).forEach(function (v) {
      const newHazard = document.createElement("li")
      if (v === false) {
        newHazard.innerText = "No"
        threathazardList.appendChild(newHazard)
      } else if (v === true) {
        newHazard.innerText = "Yes"
        threathazardList.appendChild(newHazard)
      }
    })

    // d3 start

    console.log(threatDistance)
    // Sample data
    var data = [87, 34, 45, 67, 21, 94, 18]

    // Boilerplate
    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    // Scale
    var scale = d3.scaleSequential().domain([0, 10000000]).range([0, width])

    // Axis
    var axis = d3.axisTop().scale(scale)

    svg.append("g").call(axis)

    // Gridline
    var gridlines = d3.axisTop().tickFormat("").tickSize(-height).scale(scale)
    console.log(gridlines)

    svg.append("g").attr("class", "grid").call(gridlines)

    // Visual Encodings
    svg
      .selectAll("circles")
      .data(threatDistance)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return scale(d)
      })
      .attr("cy", 100)
      .attr("r", 3)
      .attr("fill", "blue")
  })
