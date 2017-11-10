import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, PageHeader } from 'react-bootstrap';

import { fetchItemData } from '../actions'
import AlchemyContainer from './Alchemy_Container';

class App extends Component {
  render() {
    this.props.fetchItemData()
    return (
      <Grid>
        <PageHeader>Lazy Gold Application <small>Gold made lazy.</small></PageHeader>
        <AlchemyContainer />
      </Grid>
    );
  }
}

export default connect(null, { fetchItemData })(App);