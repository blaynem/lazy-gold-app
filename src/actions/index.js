import axios from 'axios';
import { apiConfig } from '../config';
import {
  FETCH_ITEM_DATA
} from '../constants'

import { mockData } from '../mockData';

export function fetchItemData() {
  return(dispatch) => {
    dispatch({ type: FETCH_ITEM_DATA, payload: mockData })
  }
}

export function testThis() {
  return(dispatch) => {
    axios({
      method: 'get',
      url: `${apiConfig.serverGet}?server=hyjal`,
    })
    .then( res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    dispatch({ type: "Test", payload: {item: "test1"} })
  }
}