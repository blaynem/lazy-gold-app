import {
  mockBloodofSargeras,
  // mockPrimalSargerite
} from '../mockData';

export const convertToGold = (price) => {
  const gold = Math.floor(price / 10000)
  const silver = Math.floor(( price - gold * 10000 ) / 100)
  const copper = Math.floor(( (price - gold * 10000) - silver * 100 ))
  return { gold, silver, copper}
}

// goes through the recipe for the intended item. goes through all their ranks and
// creates a list of the recipes needed to pass down to the component
export const getRecipeItemsList = (recipeItem, rawData) => {
    const recipeList = {};
    // TODO: need to do a check if the item is undefined, then spit out errors.
    // grabs the recipe of the specific item inside the recipe file.
    recipeItem.RecipeRank.forEach(rankObj => {
      return rankObj.Reagents.forEach(reagent => {
        if ( reagent.Id === 124124){
          console.log(`Blood of Sargeras being referenced in "${recipeItem.Name}" recipe.`)
          return recipeList[reagent.Id] = mockBloodofSargeras
        }
        if ( reagent.Id === 151568){
          console.log(`Primal Sargerite being referenced in "${recipeItem.Name}" recipe.`)
          return recipeList[reagent.Id] = mockBloodofSargeras
        }
        // if the items ID is undefined, we want to let us know.
        if (rawData.find( item => item.Id === reagent.Id) === undefined){
          console.warn(`${reagent.Name} seems to be missing. Check Id of ${reagent.Id}`)
        }
        // maps over the RecipeRank, grabbing all of the Reagents and placing them
        // inside the recipeList
        recipeList[reagent.Id] = rawData.find( item => item.Id === reagent.Id);
      });
    });
    // returns the newly created recipeList object
    return recipeList;
  };