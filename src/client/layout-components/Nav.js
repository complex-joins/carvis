import React from 'react';
import {Link} from 'react-router';
// NAV
export default (props) => {
  return (
  <nav className="navbar navbar-custom navbar-top" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
          Menu <i className="fa fa-bars"></i>
        </button>
        <Link className="navbar-brand page-scroll" to ="/">Find a Car</Link>
      </div>
      <div className="collapse navbar-collapse navbar-right navbar-main-collapse">
        {determineNavButtons(props)}
      </div>
    </div>
  </nav>
  );

};

function determineNavButtons(props) {
  switch (props.location) {
  case '/':
    return (
      <ul className="nav navbar-nav">
        <li className="hidden">
          <a href="#page-top"></a>
        </li>
        <li>
          <Link to="/1/order">
            <button className="btn btn-danger">USER DASHBOARD</button>
          </Link>
        </li>
        <li>
          <Link to="/1/dasboard">
            <button className="btn btn-danger">ORDER DASHBOARD</button>
          </Link>
        </li>
        <li>
          <a className="page-scroll" href="#about">About</a>
        </li>
        <li>
          <a className="page-scroll" href="#contact">Contact</a>
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
  default:
    return (<ul className="nav navbar-nav"></ul>);
  }
}
