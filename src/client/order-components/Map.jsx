import React from 'react';
import { initMap } from './GoogleAPI';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="max-width max-height center app-background">
        <div className="center fullHeight">
          <div id="google-estimated-time"></div>
          <div id="carvis-estimated-time"></div>
          <div id="carvis-estimated-cost"></div>
          <input id="origin-input" className="controls" type="text"
            placeholder="Enter an origin location" />
          <input id="destination-input" className="controls" type="text"
            placeholder="Enter a destination location" />
          <div id="map"></div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    initMap((cb) => {

      let cheapButton = document.getElementById('order-cheapest-car');
      let fastButton = document.getElementById('order-fastest-car');
      if (cheapButton) {
        cheapButton.addEventListener('click', () => {
          console.log('click registered');
          cb('Fare');
        });
      }
      if (fastButton) {
        fastButton.addEventListener('click', () => cb('ETA'));
      }
    });
  }
  getDirections(origin, destination) {
    let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyBgePp9nXlZXQQfD8M88ZW8YpED-BkAD7Y';
  }
}
