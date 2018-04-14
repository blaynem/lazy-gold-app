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
  renderPage = () => {
    const {
      error,
      items,
      loading,
      match: { params: { profession } }
    } = this.props
    if ( error ) return <p>{error}</p>
    if ( loading ) return <p>Loading...</p>
    if ( items.data.length < 1 ) return <p>No data loaded.</p>
    return (
      <Fragment> 
        <PageHeader>
          {profession} page
        </PageHeader>
        <ListGroup>
          {this.createMapList(profession)}
        </ListGroup>
      </Fragment>
    )
  }
  render() {
    const { message } = this.props
    return (
      <Fragment>
        { message && <p>{message}</p> }
        {this.renderPage()}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.items.error,
    items: state.items,
    loading: state.items.loading,
    message: state.items.message,
  };
}

export default connect(mapStateToProps, {})(ItemContainer);
