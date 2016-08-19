import React from 'react';
// import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';


export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section style={{ height: `80%` }}>
        <div className="fullHeight col-md-9">
          <div id="map"></div>
        </div>
      </section>
    );
  }

  getDirections(origin, destination) {
    let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyBgePp9nXlZXQQfD8M88ZW8YpED-BkAD7Y';
  }
}
