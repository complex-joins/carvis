import React from 'react';
import {Link} from 'react-router';

export default class Auth extends React.Component {
  render() {
    return (
      <div className="container text-center jarvisbg fullHeight">
        <h1>Authorize your application</h1>
        <ul className="list-inline banner-social-buttons">
          <li>
            <Link to="/lyftAuth">
              <div className="btn btn-default btn-lg carIconHolder">
                <img className="carIcon" src="../img/lyfticon.png" alt=""/>
                <span className="network-name">Authorize Lyft</span>
                <i className="fa fa-check padLeft" aria-hidden="true"></i>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/uberAuth">
              <div className="btn btn-default btn-lg carIconHolder">
                <img className="carIcon" src="../img/ubericon.png" alt=""/>
                <span className="network-name">Authorize Uber</span>
                <i className="fa fa-check padLeft" aria-hidden="true"></i>
              </div>
            </Link>
          </li>
        </ul>
        {this.props.children}
      </div>
      );
  }
}
