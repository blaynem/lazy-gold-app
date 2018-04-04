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
    const dataObj = (data) => data.reduce((acc, curr) => {
      if ( curr.Id === undefined && curr.ItemID === undefined ){
        console.warn('There was a problem processing', curr)
        return acc
      }
      return {
        ...acc,
        [curr.Id || curr.ItemID]: {
          ...curr
        }
      }
    }, {})
    const mockpayload = dataObj(mockData)
    dispatch({ type: FETCH_ITEM_DATA, payload: mockpayload })

    // axios({
    //   method: 'get',
    //   url: `${apiConfig.serverGet}?server=hyjal`,
    // })
    // .then( res => {
    //   const payload = dataObj(res.data.Items)
    //   dispatch({ type: FETCH_ITEM_DATA, payload })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
}