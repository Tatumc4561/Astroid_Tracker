import publicAPI_key from './publicAPI.js';


let startTime = new Date()
startTime = startTime.toISOString().split('T')[0]

let stopTime = new Date()
stopTime.setDate(stopTime.getDate()+7)
stopTime = stopTime.toISOString().split('T')[0]



const currentThreats = document.querySelector('.threatnum')
const threatList = document.querySelector('.threatNames')


let threatName = []


console.log(threatName)

fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startTime}&end_date=${stopTime}&api_key=${publicAPI_key}`)
.then(function(response){
    return response.json()
})
.then(function(data){
    // console.log(data.near_earth_objects)
    

    // obtain access to key/values of astroids within specified time, push to global variable
    Object.keys(data.near_earth_objects).forEach(function(key){
        // console.log(key)
        console.log(data.near_earth_objects[key])

        Object.keys(data.near_earth_objects[key]).forEach(function(amount){
            // console.log(amount)
            threatName.push(data.near_earth_objects[key][amount]['name'])


        
        })
    
    // Threat Count
    currentThreats.innerText = threatName.length

    
    })

    // Add each astroid name to list
    Object.values(threatName).forEach(function(v){
        const newItem = document.createElement('li')
        newItem.classList.add('aName')
        newItem.innerText = `${v}`
    
        threatList.appendChild(newItem)
    })
})


