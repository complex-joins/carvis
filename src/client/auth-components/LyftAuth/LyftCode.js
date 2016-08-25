import React from 'react';

export default (props) => (
  <div className="text-center">
    <p>Enter your 4 digit code below</p>
    <form onSubmit={props.submit}>
      <div className="form-group">
        <input type="number" onChange={props.formChange} maxLength="4" className="blackTextInput" name="lyftCode" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
