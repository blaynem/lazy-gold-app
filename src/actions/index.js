import axios from 'axios';
import { apiConfig } from '../config';

export function testThis() {
  return(dispatch) => {
    axios({
      method: 'get',
      url: `${apiConfig.serverGet}?server=darkspear`,
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