import React from 'react';

export default (props) => (
  <div className="text-center">
    <p>Enter your phone number</p>
    <form onSubmit={props.submit}>
      <div className="form-group">
        <input name="phoneNumber" className="blackTextInput" onChange={props.formChange} type="tel" id="tel-input"/>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  </div>
);
