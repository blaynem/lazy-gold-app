import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Jumbotron } from 'react-bootstrap';
import { Route } from 'react-router-dom'

import { fetchItemData } from '../actions'
import ItemContainer from './Item_Container';

class App extends Component {
  render() {
    this.props.fetchItemData()
    return (
      <Grid>
        <Jumbotron>
          <h1>Lazy Gold Maker</h1>
          <p>Gold made lazily.</p>
        </Jumbotron>
        <Route path="/:profession" component={ItemContainer} />
      </Grid>
    );
  }
}

export default connect(null, { fetchItemData })(App);