import React from 'react';

export default (props) => (
  <div>
    Enter your phone number below
    <form action="/auth/phoneNumber" method="POST">
      <input type="text" name="phoneNumber" />
      <button>Submit</button>
    </form>
  </div>
);
