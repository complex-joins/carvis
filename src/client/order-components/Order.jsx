import React from 'react';
import SimpleMap from './Map';
import update from 'react-addons-update';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          position: {
            lat: 37.7806521,
            lng: -122.4088319
          },
          key: `Hack Reactor`,
          defaultAnimation: 2
        }
      ]
    };
  }

  render() {
    return (
      <div className="row container fullHeight">
        <div className="fullHeight col-md-3">
          <p>Order a car</p>
          <form className="container">
            <div className="form-group">
              From:
              <input type="text blackTextInput"/>
            </div>
            <div className="form-group">
              To:
              <input type="text blackTextInput"/>
            </div>
          </form>
        </div>
        <div className="fullHeight col-md-9">
          <SimpleMap
            markers={this.state.markers}
            onMapClick={this.handleMapClick.bind(this)}
            onMarkerRightclick={this.handleMarkerRightclick.bind(this)}/>
        </div>

      </div>
    );
  }

  componentDidMount() {
    // setTimeout(() => {
    //   let { markers } = this.state;
    //   markers = update(markers, {
    //     $push: [
    //       {
    //         position: {
    //           lat: 25.99,
    //           lng: 122.9,
    //         },
    //         defaultAnimation: 2,
    //         key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    //       },
    //     ],
    //   });
    //   this.setState({ markers });
    // }, 2000);
  }


  handleOrder(e) {
    e.preventDefault();
    // make call to order car using from and to locations
  }

  handleMapClick(event) {
    let {markers} = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        }
      ]
    });
    this.setState({markers});
  }

  handleMarkerRightclick(index, event) {
    /*
    * All you modify is data, and the view is driven by data.
    * This is so called data-driven-development. (And yes, it's now in
    * web front end and even with google maps API.)
    */
    let {markers} = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1]
      ]
    });
    this.setState({markers});
  }
}
