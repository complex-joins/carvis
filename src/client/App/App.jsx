import React from 'react';
import Order from './order-components/Order';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
