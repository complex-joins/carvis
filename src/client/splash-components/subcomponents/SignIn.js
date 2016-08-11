import React from 'react';
import LyftSignInButton from './LyftSignInButton';
import UberSignInButton from './UberSignInButton';

export default (props) => (
    <div className="container text-center jarvisbg fullHeight">
      <h1>Sign In</h1>
      <ul className="list-inline banner-social-buttons">
        <LyftSignInButton />
        <UberSignInButton />
      </ul>
    </div>
);
