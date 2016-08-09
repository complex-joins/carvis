import React from 'react';

export default (props) => (
  <div className="container">
    <form onSubmit={props.submit}>
      <div className="form-group row">
        <div className="col-xs-3"></div>
        <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Phone Number Used For Lyft Account</label>
        <div className="col-xs-3">
          <input name="phoneNumber" className="form-control blackTextInput" onChange={props.formChange} type="tel" id="tel-input"/>
        </div>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  </div>
);
