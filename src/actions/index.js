import axios from 'axios';
import { apiConfig } from '../config';
import {
  FETCH_ITEM_DATA
} from '../constants'

import { mockData } from '../mockData';

// used to fetch the item data from our api. but since right now we're just
// using our local mocdata, it doesn't need to be hooked up
export function fetchItemData() {
  return(dispatch) => {
    dispatch({ type: FETCH_ITEM_DATA, payload: mockData })
    // axios({
    //   method: 'get',
    //   url: `${apiConfig.serverGet}?server=hyjal`,
    // })
    // .then( res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
}