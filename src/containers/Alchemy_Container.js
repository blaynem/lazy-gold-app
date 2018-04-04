import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ListGroup, PageHeader } from 'react-bootstrap';


import { recipes } from "../recipes";
import { names } from "../constants/namesInObj";
import ItemWrapper from "../components/ItemWrapper";
import { mockBloodofSargeras, mockPrimalSargerite } from '../mockData';

class AlchemyContainer extends Component {
  // goes through the recipe for the intended item. goes through all their ranks and
  // creates a list of the recipes needed to pass down to the component
  getRecipeItemsList = recipeItems => {
    const { items } = this.props;
    const recipeList = {};
    // TODO: need to do a check if the item is undefined, then spit out errors.
    // grabs the recipe of the specific item inside the recipe file.
    recipeItems.RecipeRank.forEach(recipeItem => {
      return recipeItem.Reagents.forEach(reagent => {
        if ( reagent.Id === 124124){
          console.log(`Blood of Sargeras being referenced in "${recipeItems.Name}" recipe.`)
          return recipeList[reagent.Id] = mockBloodofSargeras
        }
        if ( reagent.Id === 151568){
          console.log(`Primal Sargerite being referenced in "${recipeItems.Name}" recipe.`)
          return recipeList[reagent.Id] = mockBloodofSargeras
        }
        // if the items ID is undefined, we want to let us know.
        if (items.data[reagent.Id] === undefined){
          console.log(`${reagent.Name} seems to be missing. Check Id of ${reagent.Id}`)
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
  // testNew will be used to test all of the recently added recipes.
  testNew = () => {
    return this.createMapList(Object.keys(recipes))
  }
  render() {
    // in order to add another, you'll need to make sure the recipe is inside of recipes.js file.
    const firstRow = ["AncientHealingPotion", "AncientManaPotion", "AncientRejuvenationPotion"];
    const secondRow = ["DraughtofRawMagic", "SylvanElixir", "AvalancheElixir", "Skaggldrynk", "SkystepPotion", "LeytorrentPotion"]
    const thirdRow = ["PotionofDeadlyGrace", "PotionoftheOldWar", "UnbendingPotion", "PotionofProlongedPower"]
    const fourthRow = ["InfernalAlchemistStone"]
    const fifthRow = ["FlaskofTenThousandScars", "FlaskoftheCountlessArmies", "FlaskoftheWhisperedPact", "FlaskoftheSeventhDemon"]
    const sixthRow = ["AstralAlchemistStone", "LightbloodElixir", "TearsoftheNaaru", "AstralHealingPotion"]
    return (
      <Fragment>
        <PageHeader>
          Alchemy page
        </PageHeader>
        <ListGroup>{this.createMapList(firstRow)}</ListGroup>
        <ListGroup>{this.createMapList(secondRow)}</ListGroup>
        <ListGroup>{this.createMapList(thirdRow)}</ListGroup>
        <ListGroup>{this.createMapList(fourthRow)}</ListGroup>
        <ListGroup>{this.createMapList(fifthRow)}</ListGroup>
        <ListGroup>{this.createMapList(sixthRow)}</ListGroup>
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

export default connect(mapStateToProps, {})(AlchemyContainer);
