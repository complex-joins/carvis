import React from 'react';
import LyftSignInButton from './LyftSignInButton';
import UberSignInButton from './UberSignInButton';
import { Link } from 'react-router';

export default (props) => (
    <div id="signin" className="container content-section text-center jarvisbg fullHeight">
      <h2>Sign In</h2>

      <h2><Link to="/auth">Carvis Sign In</Link></h2>
      <ul className="list-inline banner-social-buttons">
        <LyftSignInButton/>
        <UberSignInButton/>
      </ul>
    </div>
);
