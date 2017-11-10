import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Jumbotron } from 'react-bootstrap';

import { fetchItemData } from '../actions'
import AlchemyContainer from './Alchemy_Container';

class App extends Component {
  render() {
    this.props.fetchItemData()
    return (
      <Grid>
        <Jumbotron>
          <h1>Lazy Gold Maker</h1>
          <p>Gold made lazily.</p>
        </Jumbotron>
        <AlchemyContainer />
      </Grid>
    );
  }
}

export default connect(null, { fetchItemData })(App);