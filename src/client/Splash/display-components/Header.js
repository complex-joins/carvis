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
            <div className="row">
              <div className="col-sm-3 col-sm-offset-4">
                <a href="#signin" className="btn btn-default btn-lg page-scroll">
                  Get Started
                  <i className="fa fa-angle-double-down animated padLeft"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
