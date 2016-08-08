import React from 'react';
import Header from './splash/Header';
import Map from './splash/Map';
import Nav from './shared-components/Nav';

export default class Splash extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Header />
        <Map />
      </div>
    );
  }
}
