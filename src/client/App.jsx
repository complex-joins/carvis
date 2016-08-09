import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="fullHeight">
        {this.props.children}
      </div>
      );
  }
}
// {React.cloneElement(this.props.children, this.props)}
