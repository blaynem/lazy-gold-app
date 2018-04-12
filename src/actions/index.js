import axios from 'axios';
import { apiConfig } from '../config';
import {
  FETCH_ITEM_DATA,
  PARSE_ITEM_DATA,
  PARSE_PROFESSION_ITEMS
} from '../constants'

import { names } from '../constants/namesInObj';
import { recipePages } from '../constants/recipepage'
import { recipes } from '../recipes';
import { calcWeightedAverage, getRecipeItemsList } from '../utils'
import { calcBloodOfSargeras } from '../utils/calc_bos';

import { mockData } from '../mockData';

// Used to caculate crafting cost of each rank of item
const calculateCraftingCost = (itemRecipe, reagentData, itemData) => {
  // map over each recipe rank per recipe,
  // returns the original array objects with a new cost property
  const newRecipeRank = itemRecipe.RecipeRank.map(rank => {
    // to calculate, we iterate over the reagants of the materials needed:
    // mat total price consists of the materials current marketValue and the amount needed to create the item
    const craftCost = (rank.Reagents).reduce( (acc, matItem) => {
      const matPrice = calcWeightedAverage(reagentData[matItem.Id])
      const total = matPrice * matItem.Amount
      return acc + total
    }, 0)

    // we divide by the amount that is crafted per rank in order to get the price.
    // Ex: Rank 1 only yields us 1, rank 3 yields us roughly 1.5
    const costOfRank = craftCost / rank.Yield
    return {
      ...rank,
      costOfRank
    }
  })
  // returns the itemRecipe with the new updated recipe rank information
  return {
    ...itemRecipe,
    RecipeRank: newRecipeRank,
  }
}

// Takes an object of profession names, with an array ofvalues of an item Names
// returns an object of profession names, with an array of values of item IDs
const parseNamesIntoIds = () => {
  const parsedProfArrays = Object.keys(recipePages).reduce( (acc, profession) => {
    const itemIdArr = recipePages[profession].map( itemName => {
      return names[itemName]
    })
    return {
      ...acc,
      [profession]: itemIdArr
    }
  }, {})
  return parsedProfArrays
}

// Takes an array of items objects, returns a key value of
// ItemsID: ItemsObj with ammended properties
// Ammended props: recipe Object, reagent Object.
// TODO: Reagent object should be removed, as we should already have this information in the data dump.
const parseNeededItems = (itemDump) => {
  return Object.keys(names).reduce( (acc, itemName) => {
    // if its undefined, its not inside the recipes and we can toss it
    if (recipes[itemName] === undefined) return acc
    // gets the items recipe from the itemName
    const itemRecipe = recipes[itemName]
    // grabs the ItemId from the itemRecipe
    const { ItemId } = itemRecipe
    // finds the item in the mock data
    const itemData = itemDump.find( item => item.Id === ItemId )
    const reagentData = getRecipeItemsList(itemRecipe, itemDump)

    const craftingCosts = calculateCraftingCost(itemRecipe, reagentData)
    // returns an object to be used
    return {
      ...acc,
      [ItemId]: {
        ...itemData,
        recipe: {
          ...craftingCosts
        },
        reagentData
      }
    }
  }, {})
}


// used to fetch the item data from our api. but right now we're just
// using our local mockdata, it doesn't need to be hooked up
export function fetchItemData() {
  return(dispatch) => {
    dispatch({ type: PARSE_PROFESSION_ITEMS, payload: parseNamesIntoIds() })
    const bloodOfSargObj = calcBloodOfSargeras(mockData)
    const addBloodOfSarg = [...mockData, bloodOfSargObj]
    const mockpayload = parseNeededItems(addBloodOfSarg)
    dispatch({ type: FETCH_ITEM_DATA, payload: addBloodOfSarg })
    dispatch({ type: PARSE_ITEM_DATA, payload: mockpayload })
    // axios({
    //   method: 'get',
    //   url: `${apiConfig.serverGet}?server=hyjal`,
    // })
    // .then( res => {
    //   const itemDumpAddId = res.data.Items.map( item => {
    //     return {
    //       ...item,
    //       Id: item.ItemID
    //     }
    //   })
    //   const bloodOfSargObj = calcBloodOfSargeras(itemDumpAddId)
    //   const addBloodOfSarg = [...itemDumpAddId, bloodOfSargObj]
    //   const payload = parseNeededItems(addBloodOfSarg)
    //   dispatch({ type: FETCH_ITEM_DATA, payload: itemDumpAddId })
    //   dispatch({ type: PARSE_ITEM_DATA, payload })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
}