import axios from 'axios';
import { apiConfig } from '../config';

export function testThis() {
  return(dispatch) => {
    console.log(apiConfig)
    dispatch({ type: "Test", payload: {item: "test1"} })
  }
}