import axios from 'axios';
import { apiConfig } from '../config';
import {
  GET_USER_PREFERENCES,
  FETCH_ITEM_DATA,
  ITEMS_ERROR,
  ITEMS_LOADING,
  ITEMS_MESSAGE,
  PARSE_ITEM_DATA,
  PARSE_PROFESSION_ITEMS,
  SAVE_USER_PREFERENCES,
} from '../constants'

import { names } from '../constants/namesInObj';
import { recipePages } from '../constants/recipepage'
import { recipes } from '../recipes';
import { calcWeightedAverage, getRecipeItemsList } from '../utils'
import { calcBloodOfSargeras } from '../utils/calc_bos';

import { mockData } from '../mockData';

// Used to caculate crafting cost of each rank of item
const calculateCraftingCost = (itemRecipe, reagentData) => {
  // map over each recipe rank per recipe,
  // returns the original array objects with a new cost property
  const newRecipeRank = itemRecipe.RecipeRank.map(rank => {
    // to calculate, we iterate over the reagants of the materials needed:
    // mat total price consists of the materials current marketValue and the amount needed to create the item
    const craftCost = (rank.Reagents).reduce( (acc, matItem) => {
      if ( !reagentData[matItem.Id] ) return null;
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

// parses the returned data
const parseReturnedData = (resItems, realm) => dispatch => {
  var utcDate = Math.round((new Date()).getTime() / 1000);
  const itemDumpAddId = resItems.map( item => {
    // needs to be item.ItemID because i stored it wrong inside dynamo.. should probably fix this.
    return {
      ...item,
      Id: item.Id || item.ItemID,
      ItemID: item.Id || item.ItemID,
      Server: realm.toLowerCase(),
      Date: utcDate,
    }
  })
  const bloodOfSargObj = calcBloodOfSargeras(itemDumpAddId)
  const addBloodOfSarg = [...itemDumpAddId, bloodOfSargObj]
  const parsedItems = parseNeededItems(addBloodOfSarg)
  return { itemDumpAddId, parsedItems }
}


/****************** USER PREFERENCES  *****************/

// gets users preferences from local storage
export const getUserPreferences = () => {
  const getFromStorage = JSON.parse(localStorage.getItem('user'))
  return {
    type: GET_USER_PREFERENCES,
    payload: getFromStorage
  };
}

// saves users preferences to local storage
export const saveUserPreferences = payload => dispatch => {
  dispatch({ type: SAVE_USER_PREFERENCES, payload })
  localStorage.setItem('user', JSON.stringify(payload))
  dispatch(fetchItemData(payload));
}

/****************** FETCH DATA FROM OUR API  *****************/

// loads session data by grabbing the 
export const loadSession = () => dispatch => {
  const userPrefs = dispatch(getUserPreferences())
  if ( userPrefs.payload && userPrefs.payload.realm ) {
    dispatch(fetchItemData(userPrefs.payload))
  }
}

// used to fetch the item data from our api. but right now we're just
// using our local mockdata, it doesn't need to be hooked up
export const fetchItemData = (values) => dispatch => {
  const { realm } = values
  dispatch({ type: ITEMS_LOADING, payload: true })
  dispatch({ type: PARSE_PROFESSION_ITEMS, payload: parseNamesIntoIds() })
  // const bloodOfSargObj = calcBloodOfSargeras(mockData)
  // const addBloodOfSarg = [...mockData, bloodOfSargObj]
  // const mockpayload = parseNeededItems(addBloodOfSarg)
  // dispatch({ type: FETCH_ITEM_DATA, payload: addBloodOfSarg })
  // dispatch({ type: PARSE_ITEM_DATA, payload: mockpayload })
  // dispatch({ type: ITEMS_LOADING, payload: false })
  console.log('gonna fetch the data locally')
  dispatch(fetchDataLocally(values));
  return
  axios({
    method: 'get',
    url: `${apiConfig.serverGet}?server=${realm}`,
  })
  .then(res => {
    if ( res.data && res.data.Count < 1 ) {
      console.log('----fetch from TSM on load')
      dispatch(fetchAndPutFromTSM(values))
      dispatch({ type: ITEMS_MESSAGE, payload: `Whoops, looks like theres no data for the selected realm. Give us a bit to gather some..` })
      return;
    }
    const currentTime = Math.round((new Date()).getTime() / 1000);
    const firstItemDate = res.data.Items[0].Date
    // if there is no date data, or time since last update has been an hour (3600 secs)
    if( !firstItemDate || currentTime - firstItemDate > 3600 ) {
      console.log('currentime', currentTime)
      console.log('firstItemDate', firstItemDate)
      console.log('difference', currentTime - firstItemDate)
      console.log('GONNA UPDATE THIS SHIT CUZ ITS OLD')
      dispatch(fetchAndPutFromTSM(values))
    }
    const { itemDumpAddId, parsedItems } = dispatch(parseReturnedData(res.data.Items, realm));
    dispatch({ type: FETCH_ITEM_DATA, payload: itemDumpAddId })
    dispatch({ type: PARSE_ITEM_DATA, payload: parsedItems })
    dispatch({ type: ITEMS_LOADING, payload: false })
  })
  .catch(err => {
    console.log(err)
    dispatch({ type: ITEMS_ERROR, payload: 'Something went wrong with the request.' })
  })
}

const fetchDataLocally = (values) => dispatch => {
  const { realm } = values;
  const data = JSON.parse(localStorage.getItem('items'))
  if ( data && data.length < 1 ) {
    dispatch(fetchAndPutFromTSM(values))
    dispatch({ type: ITEMS_MESSAGE, payload: `Whoops, looks like theres no data for the selected realm. Give us a bit to gather some..` })
    return;
  }
  const currentTime = Math.round((new Date()).getTime() / 1000);
  const firstItemDate = data[0].Date
  console.log('current time', currentTime)
  console.log('firstitem time', firstItemDate)
  console.log('calculate', currentTime - firstItemDate )
  // if there is no date data, or time since last update has been an hour (3600 secs)
  if( !firstItemDate || currentTime - firstItemDate > 360 ) {
    console.log('currentime', currentTime)
    console.log('firstItemDate', firstItemDate)
    console.log('difference', currentTime - firstItemDate)
    console.log('GONNA UPDATE THIS SHIT CUZ ITS OLD')
    dispatch(fetchAndPutFromTSM(values))
  }
  const { itemDumpAddId, parsedItems } = dispatch(parseReturnedData(data, realm));
  dispatch({ type: FETCH_ITEM_DATA, payload: itemDumpAddId })
  dispatch({ type: PARSE_ITEM_DATA, payload: parsedItems })
  dispatch({ type: ITEMS_LOADING, payload: false })
}

/****************** GETTING DATA FROM TSM  *****************/

// posts the returned data from tsm into our database
const postReturnedDataFromTSM = (itemDump) => dispatch => {
  const postToDynamo = (itemToPost) => axios({
    method: 'POST',
    url: `${apiConfig.serverGet}`,
    data: itemToPost,
  })
  .then(res => {
    console.log('---Successfully posted to dynamo', res)
  })
  .catch(err => {
    // dont need to return anything, because its just an error posting to our server
    // dispatch({ type: ITEMS_ERROR, payload: 'Something went wrong with the request.' })
  })
  console.log('STORED IN LOCALSTORAGE')
  localStorage.setItem('items', JSON.stringify(itemDump))
  return;
  let index, times = 50;
  for (index=0; index < itemDump.length; index += times ) {
    if ( index > 50 ) { break; }
    const items = [ ...itemDump.slice(index, index + times) ];
    postToDynamo(items)
  }
}

// Fetches data from the TSM database to return to our user and store in our databse.
export const fetchAndPutFromTSM = ({apikey, realm, region}) => dispatch => {
  const itemId = 4361
  // const apikey = '_6FqnqwktcVN1HHeGhFA1o6O-iFZ5qIC';
  // this URL is for singular item
  // const tsmUrl = `http://api.tradeskillmaster.com/v1/item/${region}/${realm}/${itemId}?format=json&apiKey=${apikey}`
  // this URL is for all items on server
  // const tsmUrl = `http://api.tradeskillmaster.com/v1/item/${region}/${realm}?format=json&apiKey=${apikey}`
  
  /** DOING THIS BECAUSE WE WANT TO SAVE BADNWITH */
  console.log('GONNA TRY TO POST')
  const { itemDumpAddId, parsedItems } = dispatch(parseReturnedData(mockData, realm))
  dispatch({ type: FETCH_ITEM_DATA, payload: itemDumpAddId })
  dispatch({ type: PARSE_ITEM_DATA, payload: parsedItems })
  dispatch({ type: ITEMS_LOADING, payload: false })
  dispatch(postReturnedDataFromTSM(itemDumpAddId))
  /** END HERE */
  return;
  // axios({
  //   method: 'get',
  //   url: tsmUrl
  // })
  // .then( res => {
  //   let response = res.data;
  //   if ( typeof(response) === 'object' ){
  //     // doing this because parseReturnedData expects an array of items.
  //     response = [response]
  //   }
  //   const { itemDumpAddId, parsedItems } = dispatch(parseReturnedData(response, realm))
  //   dispatch({ type: FETCH_ITEM_DATA, payload: itemDumpAddId })
  //   dispatch({ type: PARSE_ITEM_DATA, payload: parsedItems })
  //   dispatch({ type: ITEMS_LOADING, payload: false })
  //   dispatch(postReturnedDataFromTSM(itemDumpAddId))
  // })
  // .catch( err => {
  //   dispatch({ type: ITEMS_ERROR, payload: err.error })
  // })
}