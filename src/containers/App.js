import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchItemData } from '../actions'
import AlchemyContainer from './Alchemy_Container';

class App extends Component {
  render() {
    this.props.fetchItemData()
    return (
      <div>
        <h1>Lazy Gold</h1>
        <AlchemyContainer />
      </div>
    );
  }
}

export default connect(null, { fetchItemData })(App);