import React, { Component } from 'react';
import { connect } from 'react-redux'

import { AncientHealingPotion } from '../components/Alchemy/AncientHealingPotion';

class AlchemyContainer extends Component {
  render() {
    const { data } = this.props.items
    return (
      <div>
        Alchemy page
        <AncientHealingPotion data={{"127834": data[127834], "128304": data[128304], "3371": data[3371]}}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, {})(AlchemyContainer)