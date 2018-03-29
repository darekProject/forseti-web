// import axios from 'axios';
import {NUMBER_ERROR, NUMBER_OK} from "./type";

// const ROOT_URL = 'http://localhost';

export const getInfoAboutNumber = ({number}) => async dispatch => {
  try {

      // const data = await axios.post(`${ROOT_URL}/number`, {number}); // we do not have api :/
      const data = { up: 100, down: 20};

      dispatch({type: NUMBER_OK, payload: data});
  } catch (err) {
      dispatch({type: NUMBER_ERROR});
  }
};