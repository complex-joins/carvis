import React from 'react';
import Header from './display-components/Header';
import Contact from './display-components/Contact';
import SignIn from './display-components/SignIn/SignIn';
import About from './display-components/About';


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
