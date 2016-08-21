import React from 'react';
import Map from './Map';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fullHeight">
        <Map />
      </div>
    );
  }


  componentDidMount() {

  }

  handlePlacesSearch(e) {

  }


  handleOrder(e) {
    e.preventDefault();
    // make call to order car using from and to locations
  }

}
