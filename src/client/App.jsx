import React from 'react';
import Order from './order-components/Order';
export default class App extends React.Component {
  render() {
    return (
      <div className="fullHeight">
        <Order />
      </div>
      );
  }
}
// {React.cloneElement(this.props.children, this.props)}
