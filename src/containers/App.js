import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ItemContainer from './Item_Container';
import ServerInputs from '../components/ServerInputs';

import { fetchItemData } from '../actions'

import '../styles/index.less'

class App extends Component {
  componentWillMount() {
    this.props.fetchItemData()
  }
  render() {
    return (
      <Router>
        <div>
          <ServerInputs />
          <Header />
          <Navbar />
          <Route exact path="/" component={() => <div>Welcome</div>}/>
          <Route path="/prof/:profession" component={ItemContainer} />
        </div>
      </Router>
    );
  }
}

export default connect(null, { fetchItemData })(App);