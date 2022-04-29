// import API_key from './api.js';
import publicAPI_key from './publicAPI.js';


let startTime = new Date()
startTime = startTime.toISOString().split('T')[0]

let stopTime = new Date()
stopTime.setDate(stopTime.getDate()+7)
stopTime = stopTime.toISOString().split('T')[0]



const currentThreats = document.querySelector('.threatnum')
const threatList = document.querySelector('.threatNames')
const threatdateList = document.querySelector('.threatDate')
const threatsizeList = document.querySelector('.threatDiameter')
const threatdistanceList = document.querySelector('.threatDistance')
const threatvelocityList = document.querySelector('.threatVelocity')
const threathazardList = document.querySelector('.threatHazard')




let threatName = []
let threatDate = []
let threatSize = []
let threatDistance = []
let threatVelocity = []
let threatHazard = []

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
            threatDate.push(data.near_earth_objects[key][amount].close_approach_data[0].close_approach_date_full)
            threatSize.push(data.near_earth_objects[key][amount].estimated_diameter['kilometers'].estimated_diameter_max)
            threatDistance.push(data.near_earth_objects[key][amount].close_approach_data[0].miss_distance['kilometers'])
            threatVelocity.push(data.near_earth_objects[key][amount].close_approach_data[0].relative_velocity['kilometers_per_hour'])
            threatHazard.push(data.near_earth_objects[key][amount].is_potentially_hazardous_asteroid)



        
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

    Object.values(threatDate).forEach(function(v){

        const newDate = document.createElement('li')
        newDate.innerText = `${v}`
        threatdateList.appendChild(newDate)
        
    })

    Object.values(threatSize).forEach(function(v){
        const newSize = document.createElement('li')
        newSize.innerText = `${v}`
        threatsizeList.appendChild(newSize)
        
    })

    Object.values(threatDistance).forEach(function(v){
        const newDistance = document.createElement('li')
        newDistance.innerText = `${v}`
        threatdistanceList.appendChild(newDistance)
        
    })

    Object.values(threatVelocity).forEach(function(v){
        const newVelocity = document.createElement('li')
        newVelocity.innerText = `${v}`
        threatvelocityList.appendChild(newVelocity)
        
    })

    Object.values(threatHazard).forEach(function(v){
        const newHazard = document.createElement('li')
        if(v === false){
        newHazard.innerText = 'No'
        threathazardList.appendChild(newHazard)
        }
        else if(v === true){
        newHazard.innerText = 'Yes'
        threathazardList.appendChild(newHazard)
        }
    })




})



