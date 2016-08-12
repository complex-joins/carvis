import React from 'react';

export default (props) => (
  <div className="container fullHeight text-center jarvisbg">
    <h1>Sign Up for Carvis</h1>
    <form action="/auth/signup" method="POST">
      <div className="form-group">
        <div className="row">
          <div className="col-xs-2 col-xs-offset-3">
            <label htmlFor="example-tel-input" className="col-form-label">Email Address</label>
          </div>
          <div className="col-xs-3">
            <input name="email" className="form-control blackTextInput" type="email" id="email-input"/>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-xs-2 col-xs-offset-3">
            <label htmlFor="example-tel-input" className="col-form-label">Password</label>
          </div>
          <div className="col-xs-3">
            <input name="password" className="form-control blackTextInput" type="password" id="email-input"/>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
