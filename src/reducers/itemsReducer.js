const INITIAL_STATE = {
  loading: false,
  data: null
}

export default function itemsReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case "Test":
      return {
        ...state,
        data: action.payload
      }
    
    default:
      return state;
  }
} 