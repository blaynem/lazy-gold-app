import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer'
import rawDataReducer from './rawData';
import userDataReducer from './userDataReducer'

const rootReducer = combineReducers({
  items: itemsReducer,
  rawData: rawDataReducer,
  userData: userDataReducer
});

export default rootReducer;