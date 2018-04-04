import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ListGroup, PageHeader } from 'react-bootstrap';

import { getRecipeItemsList } from '../utils'
import { recipes } from "../recipes";
import { names } from "../constants/namesInObj";
import { recipePages } from "../constants/recipepage";
import ItemWrapper from "../components/ItemWrapper";

class ItemContainer extends Component {
  createMapList = itemsToMap => {
    const { items, obliterumData } = this.props;
    return [...itemsToMap].map(item => {
      if (recipes[item] === undefined || items.data[names[item]] === undefined){
        console.error(`Couldn't find data for item: ${item}`)
        return null
      }
      return (
        <ItemWrapper
          key={item}
          craftingInfo={recipes[item]}
          itemData={items.data[names[item]]}
          obliterumData={obliterumData}
          recipeItemsData={getRecipeItemsList(recipes[item], items)}
        />
      );
    });
  };
  // testNew will be used to test all of the recently added recipes.
  testNew = () => {
    return this.createMapList(Object.keys(recipes))
  }
  render() {
    const { profession } = this.props.match.params
    
    if ( recipePages[profession] === undefined ){
      return <h3>Data is borked.</h3>
    }
    return (
      <Fragment>
        <PageHeader>
          {profession} page
        </PageHeader>
        <ListGroup>{this.createMapList(recipePages[profession])}</ListGroup>
        {/* {this.testNew()} */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    obliterumData: state.items.data[124125]
  };
}

export default connect(mapStateToProps, {})(ItemContainer);
