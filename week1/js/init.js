// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [ -118.444, 34.0709], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([ -118.44067, 34.06928])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Geology Library, one of my favorite libraries on campus<br>  '))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([ -118.44190, 34.06646])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Biomedical Library<br>  '))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([ -118.44141, 34.07500])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Charles E. Young Library<br>  '))
    .addTo(map);