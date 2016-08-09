import React from 'react';

export default (props) => (
  <section id="about" className="container content-section text-center">
    <div className="row">
      <div className="col-sm-8 col-sm-offset-2">
        <h2>About Carvis</h2>
        <div className="row">
          <ul className="list-inline banner-social-buttons">
            <div className="col-xs-3 col-xs-offset-3">
              <li>
                <img className="carIcon" src="../img/lyfticon.png" alt=""/>
              </li>
            </div>
            <div className="col-xs-3">
              <li>
                <img className="carIcon" src="../img/ubericon.png" alt=""/>
              </li>
            </div>
          </ul>
          </div>
        <p>Carvis is a service that integrates Amazon Echo, Lyft, and Uber to deliver you a simple car ordering experience</p>
      </div>
    </div>
  </section>
);
