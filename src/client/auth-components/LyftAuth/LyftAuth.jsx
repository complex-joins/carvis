import React from 'react';
import axios from 'axios';
import {LyftPhoneNumber, LyftCode} from '../AuthComponents';

export default class LyftAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      code: '',
      waitingForCode: false
    };
  }

  render() {
    if (!this.state.waitingForCode) {
      return (
        <div className="container carIconHolder text-center">
          <h1>Authorize Lyft</h1>
          <img className="carIcon" src="../img/lyfticon.png" alt=""/>
          {this.props.children}
          <LyftPhoneNumber submit={this.handlePhoneNumber.bind(this)} formChange={this.handleFormChange.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div className="container carIconHolder text-center">
          <h1>Authorize Lyft</h1>
          <img className="carIcon" src="../img/lyfticon.png" alt=""/>
          {this.props.children}
          <LyftCode submit={this.handleCode.bind(this)} formChange={this.handleFormChange.bind(this)}/>
        </div>
      );
    }
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCode(e) {
    e.preventDefault(e);
    axios.post('/auth/lyftCode', {lyftCode: this.state.code})
    .then((res) => {
      console.log(res);
    });
  }
//
  handlePhoneNumber(e) {
    e.preventDefault();
    this.setState({
      waitingForCode: true
    });
    axios.post('/auth/lyftAuth', {phoneNumber: this.state.phoneNumber})
    .then((code) => {
      console.log(code);
    });
  }

}

// DUMB VERSION
// export default (props) => (
//   <div className="container">
//     <form action="/auth/lyftAuth" method="POST">
//       <div className="form-group row">
//         <div className="col-xs-3"></div>
//         <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Phone Number Used For Lyft Account</label>
//         <div className="col-xs-3">
//           <input className="form-control blackTextInput" type="tel" id="tel-input"/>
//         </div>
//       </div>
//       <button type="submit" className="btn btn-primary">Submit</button>
//     </form>
//   </div>
// );
