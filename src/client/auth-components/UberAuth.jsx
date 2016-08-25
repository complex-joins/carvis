import React from 'react';
import axios from 'axios';
import authHelper from './auth-helpers';

export default class UberAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div className="container fullHeight text-center jarvisbg">
        <h1>Authorize Uber</h1>
        <div className="carIconHolder">
          <img className="carIcon" src="../img/ubericon.png" alt=""/>
          <br/>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-3"></div>
              <div className="col-xs-2">
                <label htmlFor="example-tel-input" className=" col-form-label">Uber Account Email</label>
              </div>
              <div className="col-xs-3">
                <input name="email" onChange={this.handleFormChange.bind(this)} className="form-control blackTextInput" type="email" id="email-input"/>
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
                <input name="password" onChange={this.handleFormChange.bind(this)} className="form-control blackTextInput" type="password" id="email-input"/>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

//
  handleSubmit(e) {
    e.preventDefault();

    let body = this.state;
    if (authHelper.loggedIn()) {
      body.jwtToken = authHelper.getToken();
    }

    axios.post('/auth/uberAuth', body)
    .then((res) => {
      console.log(res);

      if (!authHelper.loggedIn()) {
        if (res.data.jwtToken) {
          // login succeeded, store token
          authHelper.login(res.data.jwtToken);  
        } else {
          // login failed, let user try again
          this.props.history.push('/auth');
          return;
        }
      }

      let nextRoute = (res.data.user.lyftToken) ? '/app' : '/lyftAuth';
      this.props.history.push(nextRoute);
    });
  }
}
