import React from 'react';
import { Link } from 'react-router';

// HEADER
export default (props) => (
  <header className="intro">
    <div className="intro-body">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1 className="brand-heading">Carvis</h1>
            <p className="intro-text">Find a car, save money</p>
            {/* hard coding this route for now. Should be /auth then check if auth */}
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-3">
                <Link to="/app">
                  <div href="#" className="btn btn-default btn-lg page-scroll">
                    Get Started
                    <i className="fa fa-sign-in padLeft" aria-hidden="true"></i>
                  </div>
                </Link>
              </div>
              <div className="col-sm-2"></div>
              <div className="col-sm-3">
                <a href="#about" className="btn btn-default btn-lg page-scroll">
                  Learn More
                  <i className="fa fa-angle-double-down animated padLeft"></i>
                </a>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
