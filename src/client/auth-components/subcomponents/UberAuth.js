import React from 'react';

export default (props) => (
  <div className="container fullHeight text-center jarvisbg">
    <h1>Authorize Uber</h1>
    <div className="carIconHolder">
      <img className="carIcon" src="../img/ubericon.png" alt=""/>
      <br/>
    </div>
    <form action="/auth/uberAuth" method="POST" className="text-center">
      <div className="form-group">
        <div className="row">
          <div className="col-xs-3"></div>
          <div className="col-xs-2">
            <label htmlFor="example-tel-input" className=" col-form-label">Uber Account Email</label>
          </div>
          <div className="col-xs-3">
            <input className="form-control blackTextInput" type="email" id="email-input"/>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-xs-3"></div>
          <div className="col-xs-2">
            <label htmlFor="example-tel-input" className=" col-form-label">Uber Account Password</label>
          </div>
          <div className="col-xs-3">
            <input className="form-control blackTextInput" type="password" id="email-input"/>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
