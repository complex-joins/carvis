import React from 'react';

export default (props) => (
  <div className="container">
    Log In Here (DOES NOT WORK)
    <form action="/auth/user" method="POST">
      <div className="form-group row">
        <div className="col-xs-3"></div>

        <label for="username" className="col-xs-1 col-form-label">Username</label>
        <div className="col-xs-2">
          <input type="username" className="blackTextInput" name="" />
        </div>

        <label for="password" className="col-xs-1 col-form-label">Password</label>
        <div className="col-xs-2">
          <input type="password" className="blackTextInput" name="" />
        </div>

        <div className="col-xs-3"></div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
