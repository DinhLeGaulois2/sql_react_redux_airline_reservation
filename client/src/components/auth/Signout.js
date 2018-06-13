import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return <div style={{"backgroundColor": "gray", "color": "cyan", "fontSize": "3em", "fontWeight": "bold", "height": "800px"}}>
      <br /><br /><br /><br /><br />
      <h1 align="center">Get the Best Airline Reservation!</h1>
      
      <h1 align="center">Welcome! Please, Sign In or Sign Up!</h1>
    </div>;
  }
}

export default connect(null, actions)(Signout);
