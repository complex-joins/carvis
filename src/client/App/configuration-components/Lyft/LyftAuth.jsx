import React from 'react';
import axios from 'axios';
import LyftPhoneNumber from './LyftPhoneNumber';
import LyftCode from './LyftCode';

export default class LyftAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      lyftCode: '',
      waitingForCode: false
    };
  }

  render() {
    if (!this.state.waitingForCode) {
      return (
        <div className="container fullHeight carIconHolder text-center jarvisbg">
          <h1>Authorize Lyft</h1>
          <img className="carIcon" src="../img/lyfticon.png" alt=""/>
          {this.props.children}
          <LyftPhoneNumber submit={this.handlePhoneNumber.bind(this)} formChange={this.handleFormChange.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div className="container fullHeight carIconHolder text-center jarvisbg">
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
    axios.post('/auth/lyftCode', {lyftCode: this.state.lyftCode, phoneNumber: this.state.phoneNumber})
    .then((res) => {
      console.log(res);
    });
    this.props.history.push('/app');
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
