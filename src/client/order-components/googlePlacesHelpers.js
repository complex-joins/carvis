import {
  createMarker
} from './googleMapsHelper';

export const addAutoComplete = (map) => {
  const defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));

  const originInput = document.getElementById('originTextField');
  const destinationInput = document.getElementById('destinationTextField');

  const options = {
    bounds: defaultBounds,
    types: ['establishment']
  };

  const autcompleteOrigin = new google.maps.places.Autocomplete(originInput, options);
  autcompleteOrigin.bindTo('bounds', map);

  const autocompleteDestination = new google.maps.places.Autocomplete(destinationInput, options);
  autocompleteDestination.bindTo('bounds', map);

};

export const findPlaces = (currentLoc, text, map) => {
  const request = {
    location: currentLoc,
    radius: '500',
    query: 'restaurant'
  };

  const service = new google.maps.places.PlacesService(map);
  
  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        createMarker(results[i]);
      }
    }
  });
};
