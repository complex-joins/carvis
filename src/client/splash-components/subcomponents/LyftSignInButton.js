import React from 'react';
import {Link} from 'react-router';

export default (props) => (
  <li>
    <Link to="/lyftAuth">
      <div className="btn btn-default btn-lg carIconHolder">
        <img className="carIcon" src="../img/lyfticon.png" alt=""/>
        <span className="network-name">Sign In With Lyft</span>
        <i className="fa fa-check padLeft" aria-hidden="true"></i>
      </div>
    </Link>
  </li>
);
