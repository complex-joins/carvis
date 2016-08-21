import React from 'react';

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destination: ''
    };
  }

  render() {
    return (
      <div className="fullHeight">
        <form className="container" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            From:
            <input type="text" name="origin" id="origin" className="blackTextInput" />
          </div>
        </form>
        <form className="container" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            To:
            <input type="text" name="destination" id="destination" className="blackTextInput" />
          </div>
          <button >GO</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

}
