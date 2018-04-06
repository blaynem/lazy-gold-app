import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ListGroup, PageHeader } from 'react-bootstrap';

import ItemWrapper from "../components/ItemWrapper";

class ItemContainer extends Component {
  createMapList = profession => {
    const { items } = this.props;

    return items[profession].map(itemId => {
      const itemObj = items.data[itemId]
      if ( itemObj === undefined ) {
        console.error(`Please notify me that an item with ID:${itemId} is not working correctly.`)
        return null
      }
      return (
        <ItemWrapper
          key={itemId}
          itemData={itemObj}
        />
      );
    });
  };
  render() {
    const { items } = this.props
    const { profession } = this.props.match.params
    if(items[profession] === undefined) return <div>Error Request</div>
    return (
      <Fragment>
        <PageHeader>
          {profession} page
        </PageHeader>
        <ListGroup>
          {this.createMapList(profession)}
        </ListGroup>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps, {})(ItemContainer);
