import API_key from './api.js';


let startTime = new Date()
startTime = startTime.toISOString().split('T')[0]
let stopTime = new Date()
stopTime = stopTime.toISOString().split('T')[0]

let nearEarthDates = []



fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startTime}&end_date=${stopTime}&api_key=${API_key}`)
.then(function(response){
    console.log(response)
    return data = response.json()
})
.then(function(data){
    // console.log(data.near_earth_objects)
    for(items in data.near_earth_objects){
        // console.log(items)
        console.log(data.near_earth_objects[`${items}`])
        nearEarthDates.push(`${items}`)
    }
})

console.log(nearEarthDates)



