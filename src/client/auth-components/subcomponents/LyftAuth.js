import React from 'react';

export default (props) => (
  <div className="container">
    <form action="/auth/lyftAuth" method="POST">
      <div className="form-group row">
        <div className="col-xs-3"></div>
        <label for="example-tel-input" className="col-xs-2 col-form-label">Phone Number Used For Lyft Account</label>
        <div className="col-xs-3">
          <input className="form-control blackTextInput" type="tel" id="tel-input"/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
