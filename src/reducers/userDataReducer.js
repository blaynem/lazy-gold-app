import {
  GET_USER_PREFERENCES,
  SAVE_USER_PREFERENCES,
} from '../constants';

const INITIAL_STATE = {
  apiKey: '',
  server: '',
  region: '',
};

export default function userDataReducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case GET_USER_PREFERENCES:
      return {
        ...state,
        ...action.payload
      };
      
    case SAVE_USER_PREFERENCES: 
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};