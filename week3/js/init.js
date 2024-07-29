
let mapOptions = {
    'coordinates': [-118.444,34.0709],
    'startingZoomLevel': 15 };
// Declare global variables 
//const coordinates = [-118.444, 34.070];
//const startingZoomLevel = 15;


// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=7w3ejiOsCvODMfBB0ggd', // Your style URL
    center: mapOptions.coordinates, // Starting position [lng, lat]
    zoom: mapOptions.startingZoomLevel // Starting zoom level
});



function addMarker(latitude, longitude, title, message){
    new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(`<h2>${title}</h2><h3>${message}</h3>`)
        )
        .addTo(map)
    createButtons(latitude,longitude,title);
        return message
}

function createButtons(latitude, longitude, title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("latitude",latitude); 
    newButton.setAttribute("longitude",longitude); 
    newButton.addEventListener('click', function(){
    map.flyTo({
        center: [longitude,latitude], 
    })
})
    document.getElementById("contents").appendChild(newButton); 
}


map.on("load", function(){
    //console.log("Map has loaded!")
    fetch(".//Users/sachigill/repos/24su-asiaam-191a-labs/week3/map.geojson")
    .then(response => response.json())
    .then(data => {
        processData(data);
    });
    //.then(data =>{
        // do something w data
   // });
//});

//fetch("map.geojson") 
   // .then(function aFunctionName(data){
    //    return data.json()
   // })
   // .then(function anotherFunctionName(data){ 
        // Do something with the data
   //     processData(data);
   // });

function processData(results){
        //console.log(results);
        results.features.forEach(feature => {
            //console.log(feature)
            //console.log(feature.geometry.coordinates)
            //console/log(feature.properties)
            let coordinates = feature.geometry.coordinates;
            let longitude = coordinates[0];
            let latitude = coordinates[1];
            let title = feature.properties.title
            let message = feature.properties.message
            addMarker(latitude,longitude,title,message);
        });
    }

//let simpleArray = ['hello','this','is','an','array']

//simpleArray.forEach(checking)

//function checking(aParameter){
   //     console.log(aParameter)
//}

//const arrayOfObjects = [{'latitude':37,'longitude':-122,'title':'Wow!','message':'This is the first marker in our array!'},{'lat':32,'lng':-118,'title':'Nice!','message':'Another marker in our array?!!'},{'lat':39,'lng':-119,'title':'OMG!','message':'This is marker 3!'},{'lat':36,'lng':-120,'title':'Cool!','message':'The marker is too cool 4 school!'}]

//for (const item of sampleDataArray){
 //       addMarker(item[0],item[1],`Marker ${item}`,`This is marker ${item}`)
//}

 //   arrayOfObjects.forEach(data=>{addMarker(data.lat,data.lng,data.title,data.message)});

//addMarker(34.063946621355655, -118.29453475472789, "Oakobing", "favorite bingsu spot")
//addMarker(33.86312905891162, -118.30939300674628, "Kansha Creamery", "matcha icecream!!")
//addMarker(34.03923865355296, -118.44258817369864, "Wanderlust", "my go-to in Sawtelle ")