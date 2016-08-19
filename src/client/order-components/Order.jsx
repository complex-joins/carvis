import React from 'react';
import Map from './Map';
import OrderForm from './OrderForm';
import { findPlaces } from './googlePlacesHelpers';
import {findCurrentLocation} from './googleMapsHelper';
import {initializeMap, addCurrentLocation} from './googleMapsHelper';
import {addAutoComplete} from './googlePlacesHelpers';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.googlePlacesKey = 'AIzaSyA5ncIxJbYX2kx_v74oyou3KxYecYpMJCw';
    this.currentLocation = findCurrentLocation();
  }

  render() {
    return (
      <div className="row container fullHeight">
        <div className="fullHeight col-md-3">
          <p>Order a car</p>
          <OrderForm handlePlacesSearch={this.handlePlacesSearch.bind(this)}/>
        </div>
        <Map currentLocation={this.currentLocation}/>
        <script type="text/javascript" src={'https://maps.googleapis.com/maps/api/js?key=' + this.googlePlacesKey + '&libraries=places'}></script>
      </div>
    );
  }

  componentDidMount() {
    this.map = initializeMap();
    addCurrentLocation(this.map);
    addAutoComplete(this.map);
  }

  handleOriginSearch(e) {
    e.preventDefault();
    // findPlaces(this.currentLocation, e., this.map);
  }

  handleOrigin(e) {

  }

  handleDestination(e) {
    // let destination = e.target.value;
    // let destinationCall = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${this.googlePlacesKey}`;
    // axios.get(destinationCall)
    // .then((res) => console.log(res));
  }


  handleOrder(e) {
    e.preventDefault();
    // make call to order car using from and to locations
  }

}
