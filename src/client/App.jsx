import React from 'react';
import Order from './app-order-components/Order';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    this.state = {
      currentUser: false
    };
  }

  render() {
    return (
      <div className="fullHeight">
        {this.props.children}
      </div>
      );
  }
}
// {React.cloneElement(this.props.children, this.props)}
