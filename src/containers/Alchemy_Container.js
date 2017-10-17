import React, { Component } from 'react';
import { connect } from 'react-redux'

import AncientHealingPotion from '../components/Alchemy/AncientHealingPotion';

class AlchemyContainer extends Component {
  render() {
    const { data } = this.props.items
    return (
      <div>
        Alchemy page
        <ul>
          {/*Should be able to remake this with the namesInObj file to make it more clear what we're using.*/}
          {/*Should also be able to reuse this for all of our items.. hopefully I did this right.*/}
          <AncientHealingPotion data={{"127834": data[127834], "128304": data[128304], "3371": data[3371], "124125": data[124125]}}/>
        </ul>
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