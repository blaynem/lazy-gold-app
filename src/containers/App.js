import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testThis } from '../actions'

class App extends Component {
  testThis = () => {
    this.props.testThis()
  }
  render() {
    return (
      <div>
        Test
        <button onClick={this.testThis}>Test</button>
      </div>
    );
  }
}

export default connect(null, { testThis })(App);