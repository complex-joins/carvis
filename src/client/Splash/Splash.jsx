import React from 'react';
import Header from './display-components/Header';
import Contact from './display-components/Contact';

export default class Splash extends React.Component {
  render() {
    console.log('rednder splash');
    return (
      <div className="fullHeight">
        <Header />
        <SignIn />
        <About />
        <Contact />
      </div>
    );
  }

}
