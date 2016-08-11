import React from 'react';
import LyftSignInButton from './LyftSignInButton';
import UberSignInButton from './UberSignInButton';

export default (props) => (
    <div id="signin" className="container content-section text-center jarvisbg fullHeight">
      <h2>Sign In</h2>
      <ul className="list-inline banner-social-buttons">
        <LyftSignInButton onClick={this.props.checkAuth}/>
        <UberSignInButton onClick={this.props.checkAuth}/>
      </ul>
    </div>
);
