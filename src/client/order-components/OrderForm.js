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
        <form className="container" onSubmit={this.props.handleOriginSearch}>
          <div className="form-group">
            From:
            <input type="text" name="origin" onChange={this.handleChange.bind(this)} id="originTextField" className="blackTextInput" />
          </div>
        </form>
        <form className="container" onSubmit={this.props.handleDestinationSearch}>
          <div className="form-group">
            To:
            <input type="text" name="destination" id="destinationTextField" onChange={this.handleChange.bind(this)} className="blackTextInput" />
          </div>
          <button >GO</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

}
