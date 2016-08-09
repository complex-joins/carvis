import React from 'react';
import {Link} from 'react-router';

export default (props) => (
  <div className="container">
    Log In Here (DOES NOT WORK)
    <form action="/auth/user" method="POST">
      <div className="form-group">
        <label htmlFor="username" >Username</label>
        <input type="username" className="blackTextInput" name="" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="blackTextInput" name="" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <Link to="/app">
      <button className="btn btn-danger">Skip the login and start ordering (CHEAT MODE)</button>
    </Link>
  </div>
);
