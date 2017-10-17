import { 
  FETCH_ITEM_DATA
} from '../constants'

const INITIAL_STATE = {
  loading: false,
  data: null
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
    case FETCH_ITEM_DATA:
      const dataObj = action.payload.reduce((acc, curr) => {
        acc[curr.Id] = curr
        return acc
      })
      return {
        ...state,
        data: dataObj
      }
    
    default:
      return state;
  }
} 