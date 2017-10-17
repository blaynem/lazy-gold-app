import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItemData } from '../actions'

class App extends Component {
  render() {
    this.props.fetchItemData()
    return (
      <div>
        Test
      </div>
    );
  }
}

export default connect(null, { fetchItemData })(App);