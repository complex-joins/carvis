// TODO: add /login and /logout links to nav based on current state of loggedIn

import React from 'react';
import Nav from './Nav';
// import authHelper from '../auth-components/auth-helpers';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loggedIn: authHelper.loggedIn()
    // };
  }

  // updateAuth(loggedIn) {
  //   this.setState({
  //     loggedIn: loggedIn
  //   });
  // }

  // componentWillMount() {
  //   authHelper.onChange = this.updateAuth;
  // }

  render() {
    let currentLocation = this.props.location.pathname;
    console.log('now at', currentLocation);
    return (
      <div className="fullHeight">
        <Nav location={currentLocation}/>
        {this.props.children}
      </div>
      );
  }
}