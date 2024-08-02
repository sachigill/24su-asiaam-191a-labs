let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':5}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=7w3ejiOsCvODMfBB0ggd',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(data){
    let longitude = data['lng']
    let latitude = data['lat'];
    let movieprefLocation = data['What is your favorite movie theater in LA?'];
    let homeZipcode = data['What zipcode do you live in?'];
    let moviepref = data['Do you like watching movies?']

    console.log(`moviepref: ${moviepref}`);
    console.log(data);

    let category = moviepref == "Yes" ? "movieLover" : "movieHater";
    let popup_message;
    if (moviepref == "Yes"){
        popup_message = `<h2>Movie-Lover</h2> <h3>Fav Theater: ${movieprefLocation}</h3> <p>Zip Code: ${homeZipcode}</p>`
    }
    else{
        popup_message = `<h2>Movie-Hater</h2><p>Zip Code: ${homeZipcode}</p>`
    }

    const newMarkerElement = document.createElement('div');


    newMarkerElement.className = `marker marker-${category}`;


    new maplibregl.Marker({element:newMarkerElement})
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(latitude,longitude,movieprefLocation);
}

function createButtons(lat,lng,title){
    if (!title){
        return;
    }
    const newButton = document.createElement("button");
    newButton.id = "button"+title; 
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSy-T6Xztn5laVtA_edqancFHbBhq_EmyazBa7HfBmpvJpKMLJ0p1gVhznYF9lTocDLyggUfBU6q2c7/pub?output=csv"

map.on('load', function() {
    createFilterUI();
    Papa.parse(dataUrl, {
        download: true,
        header: true,
        complete: function(results) {
            processData(results.data);
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        addMarker(feature);
    });
};

function createCheckboxForCategory(category, filterGroup) {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'auto auto 1fr';
    container.style.alignItems = 'center';
    container.style.gap = '8px';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = category;
    input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', category);
    label.textContent = category;

    const markerLegend = document.createElement('div');
    markerLegend.className = `marker marker-${category}`;

    container.appendChild(input);
    container.appendChild(label);
    container.prepend(markerLegend);

    filterGroup.appendChild(container);

    input.addEventListener('change', function(event) {
        toggleMarkersVisibility(category, event.target.checked);
    });
}

function createFilterUI() {
    const categories = ['movieLover', 'movieHater'];
    const filterGroup = document.getElementById('filter-group') || document.createElement('div');
    filterGroup.setAttribute('id', 'filter-group');
    filterGroup.className = 'filter-group';

    document.getElementById("legend").appendChild(filterGroup);

    categories.forEach(category => {
        createCheckboxForCategory(category, filterGroup);
    });
}

function toggleMarkersVisibility(category, isVisible) {
    const markers = document.querySelectorAll(`.marker-${category}`);
    markers.forEach(marker => {
        marker.style.display = isVisible ? '' : 'none';
    });
}