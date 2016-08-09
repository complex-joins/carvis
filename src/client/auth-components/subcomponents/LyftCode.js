import React from 'react';

export default (props) => (
  <div className="container">
    Enter your 4 digit code below
    <form action="/auth/lyftCode" method="POST">
      <input type="number" className="blackTextInput" name="lyftCode" />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
