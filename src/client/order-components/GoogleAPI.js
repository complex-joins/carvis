// eslint-disable
let map;
export default function initMap() {
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = 'DRIVING';

  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {
      lat: 37.7836845,
      lng: -122.4112196
    },
    zoom: 15
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  var origin_input = document.getElementById('origin-input');
  var destination_input = document.getElementById('destination-input');

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);

  var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
  origin_autocomplete.bindTo('bounds', map);
  var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
  destination_autocomplete.bindTo('bounds', map);

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.

  function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }
  }

  origin_autocomplete.addListener('place_changed', function() {
    var place = origin_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);
    createMarker(place);
    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    origin_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
  });

  destination_autocomplete.addListener('place_changed', function() {
    var place = destination_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);
    createMarker(place);
    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    destination_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
  });

  function route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    directionsService.route({
      origin: {
        'placeId': origin_place_id
      },
      destination: {
        'placeId': destination_place_id
      },
      travelMode: travel_mode
    }, function(response, status) {
      if (status === 'OK') {
        console.log('driving response', response);
        let time = document.getElementById('estimated-time');
        console.log(time);
        time.innerHTML =
        '<p class="pad-right no-margin"> Transit Time: '
        + getEstimatedTime(response) +
        '<button id="order-car">Order Car</button></p> ';

        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}


function createMarker(place) {
  const mark = new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    title: place.name,
    id: place.id,
  });

  console.log(place);

  const infoWindow = new google.maps.InfoWindow({
    content: `<div class="info-content-container black-text">
                <p class="info-name"><strong>${place.name}</strong></p>
                <p class="info-address small">${place.formatted_address}</p>
              </div>`,
  });

  infoWindow.open(map, mark);

}


function getEstimatedTime(gapiResponse) {
  return gapiResponse.routes[0].legs[0].duration.text;
}
