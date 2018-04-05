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
import { getRecipeItemsList } from '../utils'

import { mockData } from '../mockData';

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




// used to fetch the item data from our api. but since right now we're just
// using our local mocdata, it doesn't need to be hooked up
export function fetchItemData() {
  return(dispatch) => {
    dispatch({ type: PARSE_PROFESSION_ITEMS, payload: parseNamesIntoIds() })
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
        // returns an object to be used
        return {
          ...acc,
          [ItemId]: {
            ...itemData,
            recipe: {
              ...itemRecipe
            },
            reagentData
          }
        }
      }, {})
    }
    const mockpayload = parseNeededItems(mockData)
    dispatch({ type: FETCH_ITEM_DATA, payload: mockData })
    dispatch({ type: PARSE_ITEM_DATA, payload: mockpayload })
    // axios({
    //   method: 'get',
    //   url: `${apiConfig.serverGet}?server=hyjal`,
    // })
    // .then( res => {
    //   const addid = res.data.Items.map( item => {
    //     return {
    //       ...item,
    //       Id: item.ItemID
    //     }
    //   })
    //   const payload = parseNeededItems(addid)
    //   dispatch({ type: FETCH_ITEM_DATA, payload: addid })
    //   dispatch({ type: PARSE_ITEM_DATA, payload })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
}