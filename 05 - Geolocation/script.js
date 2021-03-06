'use strict';

const GOOGLE_API_KEY = 'xxx';
let distance = 0;
let lastPosition;
let map;
let marker;


// initialise google maps
function initMap(position) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        zoom: 18
    });

    initMarker(position);
}

// create a marker, used for showing current position
function initMarker(position) {
    marker = new google.maps.Marker({
        map: map,
        position: position,
        icon: 'images/marker.png'
    });
}


// whenever we get a new position
navigator.geolocation.watchPosition(onNewPosition, null, {
    enableHighAccuracy: true
});

function onNewPosition(data) {
    let newPosition = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }

    console.log(newPosition);

    // TEST - draw current position as a static image
    //previewLocation(newPosition);
    //return;

    // if we haven't yet, initialise the map
    if (!map) {
        initMap(newPosition);
    }

    // center map to current position
    map.setCenter(newPosition);
    marker.setPosition(newPosition);

    // if we have moved
    if (lastPosition) {

        // update distance, draw line on map
        distance += calcDistance(newPosition, lastPosition);
        drawLine(lastPosition, newPosition);
    }

    // update text info
    updateInfo(newPosition, distance);

    lastPosition = newPosition;
}

// QUICK TEST - draw current position as a static image
function previewLocation(position) {
    let src = `https://maps.googleapis.com/maps/api/staticmap?center=${position.lat},${position.lng}&zoom=13&size=300x300&key=${GOOGLE_API_KEY}`;
    document.querySelector('img').src = src;
}


// update text
function updateInfo(position, distance) {
    let lat = Math.round(position.lat * 100) / 100;
    let lng = Math.round(position.lng * 100) / 100;

    document.querySelector('#lat').innerText = lat;
    document.querySelector('#lng').innerText = lng;
    document.querySelector('#distance').innerText = Math.round(distance);
}

// HELPER FUNCTION - draw a line on the map
function drawLine(position1, position2) {
    new google.maps.Polyline({
        map: map,
        path: [position1, position2],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeWeight: 4
    });
}

// HELPER FUNCTION - calculate the distance between two points
function calcDistance(position1, position2) {
    var p1 = new google.maps.LatLng(position1.lat, position1.lng);
    var p2 = new google.maps.LatLng(position2.lat, position2.lng);

    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
}
