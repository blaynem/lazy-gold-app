import React, { Component } from "react";
import { connect } from "react-redux";

import { recipes } from "../recipes";
import { names } from "../constants/namesInObj";
import ItemWrapper from "../components/ItemWrapper";

class AlchemyContainer extends Component {
  // goes through the recipe for the intended item. goes through all their ranks and
  // creates a list of the recipes needed to pass down to the component
  getRecipeItemsList = (recipeItems) => {
    const { items } = this.props
    const recipeList = {}
    recipeItems.RecipeRank.map( (item) => {
      return item.Reagents.map( reagent => {
        recipeList[reagent.Id] = items.data[reagent.Id]
      })
    })
    return recipeList
  }
  render() {
    const { items, obliterum } = this.props;
    return (
      <div>
        Alchemy page
        <ul>
          {/*Should also be able to reuse this for all of our items.. hopefully I did this right.*/}
          <ItemWrapper
            craftingInfo={recipes.AncientHealingPotion}
            itemData={items.data[names.AncientHealingPotion]}
            itemName="AncientHealingPotion"
            obliterum={obliterum}
            recipeItemsData={this.getRecipeItemsList(recipes.AncientHealingPotion)}
          />
          <ItemWrapper
            craftingInfo={recipes.AncientManaPotion}
            itemData={items.data[names.AncientManaPotion]}
            itemName="AncientManaPotion"
            obliterum={obliterum}
            recipeItemsData={this.getRecipeItemsList(recipes.AncientManaPotion)}
          />
              {/* // AncientHealingPotion: data[names.AncientHealingPotion],
              // YserallineSeed: data[names.YserallineSeed],
              // CrystalVial: data[names.CrystalVial], */}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    obliterum: state.items.data[124125]
  };
}

export default connect(mapStateToProps, {})(AlchemyContainer);
