// eslint-disable
let map;
const formatAnswer = (mode, value) => {
  if (!value) {
    return 'not available';
  }
  let winnerEstimate;
  // convert estimate to $ or minutes
  if (mode === 'fast') {
    let minutes = Math.floor(value / 60);
    winnerEstimate = minutes.toString() + ' minutes'; // always full minutes
  } else {
    let dollars = Math.floor(value / 100);
    let cents = Math.floor(value % 100);
    winnerEstimate = '$' + dollars.toString() + '.';
    winnerEstimate += cents.toString();
  }
  return winnerEstimate;
};

export const initMap = () => {
  let origin_place_id = null;
  let destination_place_id = null;
  let travel_mode = 'DRIVING';
  let origin = {};
  let destination = {};
  let userId = 1; // hardcoded.
  //let carvisRideId;

  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {
      lat: 37.7836845,
      lng: -122.4112196
    },
    zoom: 15
  });

  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  let origin_input = document.getElementById('origin-input');
  let destination_input = document.getElementById('destination-input');

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);

  let origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
  origin_autocomplete.bindTo('bounds', map);
  let destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
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

  origin_autocomplete.addListener('place_changed', function () {
    let place = origin_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);
    createMarker(place);
    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    origin_place_id = place.place_id;

    // set origin for getEstimate
    let origin_lat = place.geometry.location.lat();
    let origin_lng = place.geometry.location.lng();
    origin.coords = [origin_lat, origin_lng];
    origin.descrip = place.formatted_address;
    // invoke.

    route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay, origin, destination, userId);
  });

  destination_autocomplete.addListener('place_changed', function () {
    let place = destination_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);
    createMarker(place);
    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    destination_place_id = place.place_id;

    // set destination for getEstimate
    let destination_lat = place.geometry.location.lat();
    let destination_lng = place.geometry.location.lng();
    destination.coords = [destination_lat, destination_lng];
    destination.descrip = place.formatted_address;
    // invoke

    route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay, origin, destination, userId);
  });

  function route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    console.log('route invoked');

    // local post to router, which will pass through to getEstimate.
    // NOTE: local router will need to decrypt the production userId before CARVIS_API getEstimate post
    let url = `http://localhost:8000/internal/getEstimate`; // hardcoded.
    // let url = `http://${process.env.CARVIS_WEB_API}/internal/getEstimate`;
    let body = (requestType) => {
      let body = {
        requestType: requestType,
        origin: origin,
        destination: destination,
        carvisUserId: userId
      };
      return body;
    };

    // TODO: link up the ORDER car buttons

    // Cost Estimate - web client -> web server -> main api -> Lyft/Uber
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'x-access-token': ''
        },
        body: JSON.stringify(body('cheap'))
      })
      .then(res => res.json())
      .then(data => {
        console.log('success getEstimate POST COST', data);
        // display the relevant data
        let carvisTime = document.getElementById('carvis-estimated-cost');
        console.log(carvisTime);
        carvisTime.innerHTML =
          '<p class="pad-right no-margin"> Carvis Estimated Cost | Lyft: ' + formatAnswer('cheap', data.lyftEstimatedFare) + ' | Uber: ' + formatAnswer('cheap', data.uberEstimatedFare) + '<button class="black-text" id="order-cheapest-car">Order Cheapest Car</button></p> ';

        // getEstimate already posts to the DB.
        // // addRide - web client -> web api -> carvis api -> DB
        // let addRideURL = `http://localhost:8000/internal/addRide`; // hardcoded.
        // let lyftEstimatedFare = data.lyftEstimatedFare || 1000000;
        // let uberEstimatedFare = data.uberEstimatedFare || 1000000;
        // let winner = {};
        // winner.estimate = lyftEstimatedFare < uberEstimatedFare ? lyftEstimatedFare : uberEstimatedFare;
        // winner.vendor = lyftEstimatedFare < uberEstimatedFare ? 'Lyft' : 'Uber';
        // winner.estimateType = 'fare';
        // let body = {
        //   winner: winner,
        //   userId: userId,
        //   origin: origin,
        //   destination: destination
        // };
        // // if (carvisRideId) {
        // //   body.carvisRideId = carvisRideId;
        // // }
        //
        // return fetch(addRideURL, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       // token
        //     },
        //     body: JSON.stringify(body)
        //   })
        //   .then(res => res.json())
        //   .then(data => {
        //     console.log('success ETA POST Addride', data);
        //     //carvisRideId = data.id;
        //   })
        //   .catch(err => console.warn('error ETA POST Addride', err));
      })
      .catch(err => console.warn('error in getEstimate POST COST', err));

    // ETA Estimate - web client -> web server -> main api -> Lyft/Uber
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'x-access-token': ''
        },
        body: JSON.stringify(body('fast'))
      })
      .then(res => res.json())
      .then(data => {
        console.log('success getEstimate POST ETA', data);
        // display the relevant data
        let carvisTime = document.getElementById('carvis-estimated-time');
        console.log(carvisTime);
        carvisTime.innerHTML =
          '<p class="pad-right no-margin"> Carvis Estimated Time | Lyft: ' + formatAnswer('fast', data.lyftEstimatedETA) + ' | Uber: ' + formatAnswer('fast', data.uberEstimatedETA) + '<button  class="black-text" id="order-fastest-car">Order Fastest Car</button></p> ';

        // getEstimate already posts to the DB.    
        // // addRide - web client -> web api -> carvis api -> DB
        // let addRideURL = `http://localhost:8000/internal/addRide`; // hardcoded.
        // let lyftEstimatedETA = data.lyftEstimatedETA || 1000000;
        // let uberEstimatedETA = data.uberEstimatedETA || 1000000;
        // let winner = {};
        // winner.estimate = lyftEstimatedETA < uberEstimatedETA ? lyftEstimatedETA : uberEstimatedETA;
        // winner.vendor = lyftEstimatedETA < uberEstimatedETA ? 'Lyft' : 'Uber';
        // winner.estimateType = 'eta';
        // let body = {
        //   winner: winner,
        //   userId: userId,
        //   origin: origin,
        //   destination: destination
        // };
        //
        // // add the rideId to body in case the other call previously returned
        // // note: this is improbable - and the best way around this has to be discussed. Winning vendor might also differ with time vs cost, and we'd probably want to keep track of both - or overwrite somehow ?
        // // if (carvisRideId) {
        // //   body.carvisRideId = carvisRideId;
        // // }
        //
        // return fetch(addRideURL, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       // token
        //     },
        //     body: JSON.stringify(body)
        //   })
        //   .then(res => res.json())
        //   .then(data => {
        //     console.log('success ETA POST Addride', data);
        //     //carvisRideId = data.id;
        //   })
        //   .catch(err => console.warn('error ETA POST Addride', err));
      })
      .catch(err => console.warn('error in getEstimate POST ETA', err));

    directionsService.route({
      origin: {
        'placeId': origin_place_id
      },
      destination: {
        'placeId': destination_place_id
      },
      travelMode: travel_mode
    }, function (response, status) {
      if (status === 'OK') {
        console.log('driving response', response);
        let time = document.getElementById('google-estimated-time');
        console.log(time);
        time.innerHTML =
          '<p class="pad-right no-margin"> Google Estimated Time: ' +
          getEstimatedTime(response);
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
