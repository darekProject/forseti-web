import axios from 'axios';
import {NUMBER_ERROR, NUMBER_OK, AUTH_ERROR, AUTH_USER, UNAUTH_USER} from "./type";

const ROOT_URL = 'http://localhost:5050';

export const getInfoAboutNumber = ({number}) => async dispatch => {
  try {

      // const data = await axios.post(`${ROOT_URL}/number`, {number}); // we do not have api :/
      const data = { up: 100, down: 20};

      dispatch({type: NUMBER_OK, payload: data});
  } catch (err) {
      dispatch({type: NUMBER_ERROR});
  }
};

export const signUpUser = ({name, surname, email, password}) => async dispatch => {

    try {
        const userData = await axios.post(`${ROOT_URL}/api/user/registration`, {
            name,
            surname,
            email,
            password
        });

        dispatch({type: AUTH_USER, payload: userData.data});
        sessionStorage.setItem('token', userData.data.token);
        sessionStorage.setItem('fullName', `${userData.data.name} ${userData.data.surname}`);
        sessionStorage.setItem('idUser', userData.data.id);
    } catch (e) {
        return dispatch(authError('Error in create account'));
    }

};

export const signInUser = ({email, password}) => async dispatch => {
    try {

        const userData = await axios.post(`${ROOT_URL}/api/user/login`, {
            email,
            password
        });

        dispatch({type: AUTH_USER, payload: userData.data});
        sessionStorage.setItem('token', userData.data.token);
        sessionStorage.setItem('fullName', `${userData.data.name} ${userData.data.surname}`);
        sessionStorage.setItem('idUser', userData.data.id);

    } catch (e) {
        return dispatch(authError('Error in login'));
    }
};

export const signOutUser = () => {
    sessionStorage.removeItem('token');

    return {type: UNAUTH_USER};
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
};
