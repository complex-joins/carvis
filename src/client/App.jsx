import React from 'react';
import Nav from './shared-components/Nav'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fullHeight">
        <Nav />
        {React.cloneElement(this.props.children, this.props)}
      </div>
      );
  }
}

//
