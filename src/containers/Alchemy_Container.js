import React, { Component } from "react";
import { connect } from "react-redux";

import { recipes } from "../recipes";
import { names } from "../constants/namesInObj";
import ItemWrapper from "../components/ItemWrapper";
import { mockBloodofSargeras } from '../mockData';

class AlchemyContainer extends Component {
  // goes through the recipe for the intended item. goes through all their ranks and
  // creates a list of the recipes needed to pass down to the component
  getRecipeItemsList = recipeItems => {
    const { items } = this.props;
    const recipeList = {};
    // grabs the recipe of the specific item inside the recipe file.
    recipeItems.RecipeRank.forEach(recipeItem => {
      return recipeItem.Reagents.forEach(reagent => {
        if ( reagent.Id === 124124){
          console.log(`Blood of Sargeras being referenced in "${recipeItems.Name}" recipe.`)
          return recipeList[reagent.Id] = mockBloodofSargeras
        }
        // maps over the RecipeRank, grabbing all of the Reagents and placing them
        // inside the recipeList
        recipeList[reagent.Id] = items.data[reagent.Id];
      });
    });
    // returns the newly created recipeList object
    return recipeList;
  };
  createMapList = itemsToMap => {
    const { items, obliterumData } = this.props;
    return [...itemsToMap].map(item => {
      return (
        <ItemWrapper
          key={item}
          craftingInfo={recipes[item]}
          itemData={items.data[names[item]]}
          obliterumData={obliterumData}
          recipeItemsData={this.getRecipeItemsList(recipes[item])}
        />
      );
    });
  };
  render() {
    // in order to add another, you'll need to make sure the recipe is inside of recipes.js file.
    const firstRow = ["AncientHealingPotion", "AncientManaPotion", "AncientRejuvenationPotion"];
    const secondRow = ["DraughtofRawMagic", "SylvanElixir", "AvalancheElixir", "Skaggldrynk", "SkystepPotion", "LeytorrentPotion"]
    const thirdRow = ["PotionofDeadlyGrace", "PotionoftheOldWar", "UnbendingPotion", "PotionofProlongedPower"]
    return (
      <div>
        Alchemy page
        {/* <ul>{this.createMapList(firstRow)}</ul>
        <ul>{this.createMapList(secondRow)}</ul> */}
        <ul>{this.createMapList(thirdRow)}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    obliterumData: state.items.data[124125]
  };
}

export default connect(mapStateToProps, {})(AlchemyContainer);
