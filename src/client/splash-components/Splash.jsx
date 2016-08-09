import React from 'react';
import {Header, Map, About, Contact} from './SplashComponents';

export default class Splash extends React.Component {
  render() {
    return (
      <div className="fullHeight">
        <Header />
        <About />
        <Map />
        <Contact />
      </div>
    );
  }
}
