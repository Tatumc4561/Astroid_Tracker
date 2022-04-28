import API_key from './api.js';


let startTime = new Date()
startTime = startTime.toISOString().split('T')[0]

let stopTime = new Date()
stopTime.setDate(stopTime.getDate()+7)
stopTime = stopTime.toISOString().split('T')[0]



const currentThreats = document.querySelector('.threatnum')
const threatList = document.querySelector('.threatNames')

let threatCount = []
let threatName = []

console.log(threatCount)
console.log(threatName)

fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startTime}&end_date=${stopTime}&api_key=${API_key}`)
.then(function(response){
    return response.json()
})
.then(function(data){
    // console.log(data.near_earth_objects)
   
    Object.keys(data.near_earth_objects).forEach(function(key){
        // console.log(key)
        console.log(data.near_earth_objects[key])

        Object.keys(data.near_earth_objects[key]).forEach(function(amount){
            // console.log(amount)
            threatCount.push(amount)
            threatName.push(data.near_earth_objects[key][amount]['name'])


        
        })
    currentThreats.innerText = threatCount.length

    
    })

})

// Object.keys(threatName).forEach(function(each){
//     const newItem = document.createElement('li')
//     newItem.classList.add('aName')
//     newItem.innerText = `${each}`

//     threatList.appendChild(newItem)
// })

Object.entries(threatName).forEach(function(k,v){
    const newItem = document.createElement('li')
    newItem.classList.add('aName')
    newItem.innerText = `${v}`

    threatList.appendChild(newItem)
})