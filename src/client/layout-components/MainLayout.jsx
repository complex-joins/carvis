import React from 'react';
import Nav from './Nav';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inAuth: false
    };
  }

  render() {
    let currentLocation = this.props.location.pathname;
    console.log('now at', currentLocation);
    return (
      <div className="fullHeight">
        <Nav location={currentLocation}/>
        {this.props.children}
      </div>
      );
  }
}
// {React.cloneElement(this.props.children, this.props)}
