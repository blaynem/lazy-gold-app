import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer'
import rawDataReducer from './rawData';

const rootReducer = combineReducers({
  items: itemsReducer,
  rawData: rawDataReducer
});

export default rootReducer;