import { 
  FETCH_ITEM_DATA
} from '../constants'

const INITIAL_STATE = {
  loading: false,
  data: []
}

// these are the only properties in the current object, so try not to use any of the other ones right now.
// const objectExample = {
//   Class:"Consumable",
//   ItemID:129099,
//   MarketValue:27320,
//   MinBuyout:0,
//   Name:"Gem Chip",
//   NumAuctions:0,
//   Quantity:0,
//   Server:"hyjal",
//   VendorBuy:0,
//   VendorSell:2250
// }

export default function itemsReducer(state = INITIAL_STATE, action){
  switch(action.type){
    // when we fetch the data, we want to create an object for our state that uses all the items IDs.
    case FETCH_ITEM_DATA:
      return {
        ...state,
        data: action.payload
      }
    
    default:
      return state;
  }
} 