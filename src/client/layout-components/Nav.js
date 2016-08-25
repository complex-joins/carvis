import React from 'react';
import {Link} from 'react-router';
import authHelper from '../auth-components/auth-helpers';
// NAV
export default (props) => {
  return (
  <nav className="navbar navbar-custom navbar-top" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
          Menu <i className="fa fa-bars"></i>
        </button>
        <Link className="navLogo" to="/"><img src="../img/carvisicon.png" alt=""/></Link>
        <Link className="navbar-brand page-scroll" to ="/">Carvis</Link>
      </div>
      <div className="collapse navbar-collapse navbar-right navbar-main-collapse">
        {determineNavButtons(props)}
      </div>
    </div>
  </nav>
  );

};

function determineNavButtons(props) {
  let loginButton;
  if (authHelper.loggedIn()) {
    loginButton = <Link to="/logout">Log Out</Link>;
  } else {
    loginButton = <Link to="/auth">Log In</Link>;
  }

  switch (props.location) {
  case '/':
    return (
      <ul className="nav navbar-nav">
        <li className="hidden">
          <a href="#page-top"></a>
        </li>
        <li>
          <a className="page-scroll" href="#about">About</a>
        </li>
        <li>
          <a className="page-scroll" href="#contact">Contact</a>
        </li>
        <li>
          {loginButton}
        </li>
      </ul>
    );
  case '/lyftAuth':
    return (
      <ul className="nav navbar-nav">
        <li>
          <Link to="/auth">Go Back</Link>
        </li>
        <li>
          <Link to="/uberAuth">Switch to Uber</Link>
        </li>
      </ul>
    );
  case '/uberAuth':
    return (
      <ul className="nav navbar-nav">
        <li className="hidden">
          <a href="#page-top"></a>
        </li>
        <li>
          <Link to="/auth">Go Back</Link>
        </li>
        <li>
          <Link to="/lyftAuth">Switch to Lyft</Link>
        </li>
      </ul>
    );
  case '/app':
    return (
      <ul className="nav navbar-nav">
        <li className="hidden">
          <a href="#page-top"></a>
        </li>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    );
  default:
    return (<ul className="nav navbar-nav"></ul>);
  }
}
