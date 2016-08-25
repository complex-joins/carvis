import React from 'react';
import authHelper from './auth-helpers';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    authHelper.logout();
    setTimeout( () => this.props.history.push('/'), 3000);
  }

  render() {
    return (
      <h2 className="container content-section text-center">
        You have been logged out. Redirecting to home...
      </h2>
    );
  }
}