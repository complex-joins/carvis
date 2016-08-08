import React from 'react';

export default (props) => (
  <div>
    Enter your 4 digit code below
    <form action="/auth/lyftCode" method="POST">
      <input type="number" name="lyftCode" />
      <button>Submit</button>
    </form>
  </div>
);
