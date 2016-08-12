import React from 'react';
import axios from 'axios';

export default class UberAuth extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container fullHeight text-center jarvisbg">
        <h1>Authorize Uber</h1>
        <div className="carIconHolder">
          <img className="carIcon" src="../img/ubericon.png" alt=""/>
          <br/>
        </div>
        <form action="/auth/uberAuth" method="POST">
          <div className="form-group">
            <div className="row">
              <div className="col-xs-3"></div>
              <div className="col-xs-2">
                <label htmlFor="example-tel-input" className=" col-form-label">Uber Account Email</label>
              </div>
              <div className="col-xs-3">
                <input name="email" className="form-control blackTextInput" type="email" id="email-input"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-3"></div>
              <div className="col-xs-2">
                <label htmlFor="example-tel-input" className="col-form-label">Uber Account Password</label>
              </div>
              <div className="col-xs-3">
                <input name="password" className="form-control blackTextInput" type="password" id="email-input"/>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

}


// this.state = {
//   email: '',
//   password: '',
// };

// Async Submit
// handleFormChange(e) {
//   this.setState({
//     [e.target.name]: e.target.value
//   });
// }

// handleSubmit(e) {
//   e.preventDefault();
//   axios.post('/auth/uberAuth', this.state)
//   .then((res) => {
//     console.log(res);
//   });
// }
// onSubmit={this.handleSubmit.bind(this)}
