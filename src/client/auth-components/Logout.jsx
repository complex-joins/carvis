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
      <p>You have been logged out. Redirecting shortly to home...</p>
    );
  }
}