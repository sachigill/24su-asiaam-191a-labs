// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=7w3ejiOsCvODMfBB0ggd', // Your style URL
    center: [ -118.444, 34.0709], // Starting position [lng, lat]
    zoom: 10 // Starting zoom level
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


addMarker(34.063946621355655, -118.29453475472789, "Oakobing", "favorite bingsu spot")
addMarker(33.86312905891162, -118.30939300674628, "Kansha Creamery", "matcha icecream!!")
addMarker(34.03923865355296, -118.44258817369864, "Wanderlust", "my go-to in Sawtelle ")
