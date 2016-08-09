import React from 'react';
import Stats from './Stats';
import Settings from './Settings';

export default class UserPanel extends React.Component {
  render() {
    return (
      <div className="fullHeight">
        {this.props.children}
      </div>
      );
  }
}
