import React from 'react';
import {Header, About, Contact, SignIn} from './SplashComponents';

export default (props) => (
  <div className="fullHeight">
    <Header />
    <SignIn />
    <About />
    <Contact />
  </div>
);
