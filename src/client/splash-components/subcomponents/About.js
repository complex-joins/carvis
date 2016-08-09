import React from 'react';

export default (props) => (
  <section id="about" className="container content-section text-center">
    <div className="row">
      <div className="col-lg-8 col-lg-offset-2">
        <h2>About Carvis</h2>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <ul className="list-inline banner-social-buttons">
              <li>
                <img className="carIcon" src="../img/lyfticon.png" alt=""/>
              </li>
              <li>
                <img className="carIcon" src="../img/ubericon.png" alt=""/>
              </li>
            </ul>
          </div>
        </div>
        <p>Carvis is a service that integrates Amazon Echo, Lyft, and Uber to deliver you a simple car ordering experience</p>
      </div>
    </div>
  </section>
);
