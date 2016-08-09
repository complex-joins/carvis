import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inAuth: false
    };
  }

  render() {
    return (
      <div className="fullHeight">
        <Nav />
        {this.props.children}
        <Footer />
      </div>
      );
  }
}
// {React.cloneElement(this.props.children, this.props)}
