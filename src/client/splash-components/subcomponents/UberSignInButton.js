import React from 'react';
import {Link} from 'react-router';

export default (props) => (
  <li>
    <Link to="/uberAuth">
      <div className="btn btn-default btn-lg carIconHolder">
        <img className="carIcon" src="../img/ubericon.png" alt=""/>
        <span className="network-name">Sign In With Uber</span>
        <i className="fa fa-check padLeft" aria-hidden="true"></i>
      </div>
    </Link>
  </li>
);
