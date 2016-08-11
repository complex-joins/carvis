import React from 'react';
import {Header, About, Contact, SignIn} from './SplashComponents';

export default class Splash extends React.Component {
  checkAuth() {
    // make call to see if user is auth
      // if they are authenticated, go straight to dash
    axios.get('/auth/checkLogin')
      .then((res) => {
        if (res.authenticated) {
          this.setState({
            currentUser: res.userid
          });
          this.props.history.push(`/app/${res.userid}/dashboard`);
        }
      });
    // If they are not, let them go to uber or lyft auth (wherever they were going....)
  }

  render() {
    return (
      <div className="fullHeight">
        <Header />
        <SignIn checkAuth = {this.checkAuth.bind(this)}/>
        <About />
        <Contact />
      </div>
    );
  }
  
}
