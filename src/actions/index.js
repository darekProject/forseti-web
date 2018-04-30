import axios from 'axios';
import {
    NUMBER_ERROR,
    NUMBER_OK,
    NUMBER_INFO,
    THUMBS_UPDATA,
    THUMBS_ERROR,
    AUTH_ERROR,
    AUTH_USER,
    USER_ADDED,
    UNAUTH_USER
} from "./type";

const ROOT_URL = 'http://localhost:8080/api';

export const getInfoAboutNumber = ({number}) => async dispatch => {
    try {
        // const data = await axios.post(`${ROOT_URL}/`, {number}); // we do not have api :/
        const data = {
            comments: [
                {
                    name: 'Jan Kowalski',
                    content: 'Konto sprawdzone polecam na 100%'
                },
                {
                    name: 'Maria Kowalski',
                    content: 'Robilam przelewa dwa razy. Polecam tego numerowicza!!!'
                }
            ]
        }

        dispatch({type: NUMBER_INFO, payload: data})
    } catch (e) {
        dispatch({type: NUMBER_ERROR});
    }
}

export const getThumbsByAccountNum = ({number}) => async dispatch => {
    try {

        // const data = await axios.post(`${ROOT_URL}/number`, {number}); // we do not have api :/
        const data = {up: 100, down: 20};

        dispatch({type: NUMBER_OK, payload: data});
    } catch (err) {
        dispatch({type: NUMBER_ERROR});
    }
};

export const signUpUser = ({name, surname, email, password}) => async dispatch => {

    try {
        await axios.post(`${ROOT_URL}/signup/`, {
            email,
            password
        });

        dispatch({type: USER_ADDED});
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

export const sendThumbs = value => async dispatch => {
    try {
        // const res = await axios.put(`${ROOT_URL}/thumbs`, {
        //     value
        // });

        const res = {
            data: {
                status: 'OK',
                data: {
                    up: 101,
                    down: 50
                }
            },
        };

        dispatch({type: THUMBS_UPDATA, payload: res.data})

    } catch (e) {
        dispatch({typ: THUMBS_ERROR});
    }
};
