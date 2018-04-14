import {
  ITEMS_ERROR,
  ITEMS_LOADING,
  ITEMS_MESSAGE,
  PARSE_ITEM_DATA,
  PARSE_PROFESSION_ITEMS
} from '../constants'

const INITIAL_STATE = {
  alchemy: [],
  data: [],
  error: null,
  message: null,
  leatherworking: [],
  loading: false,
  tailoring: []
}

export default function itemsReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        message: null,
      }
    case ITEMS_LOADING:
      return {
        ...state,
        error: null,
        loading: action.payload,
        message: null,
      }
    case ITEMS_MESSAGE:
      return {
        ...state,
        error: null,
        loading: false,
        message: action.payload,
      }
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