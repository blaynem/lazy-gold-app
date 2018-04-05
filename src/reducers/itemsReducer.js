import { 
  PARSE_ITEM_DATA,
  PARSE_PROFESSION_ITEMS
} from '../constants'

const INITIAL_STATE = {
  loading: false,
  data: [],
  alchemy: [],
  leatherworking: [],
  tailoring: []
}

export default function itemsReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case PARSE_ITEM_DATA:
      return {
        ...state,
        data: action.payload
      }
    case PARSE_PROFESSION_ITEMS:
      return {
        ...state,
        ...action.payload
      }
    
    default:
      return state;
  }
} 