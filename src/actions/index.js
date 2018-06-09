import axios from 'axios';
import {
    setToken,
    removeToken,
    setUserName,
    getToken,
    removeUserName,
    setAdminPermission,
    removeAdminPermission
} from '../utils/utlis';
import {
    NUMBER_ERROR,
    NUMBER_INFO,
    THUMBS_UPDATA,
    THUMBS_ERROR,
    AUTH_ERROR,
    AUTH_USER,
    USER_ADDED,
    UNAUTH_USER,
    OPEN_MODAL, ADD_COMMENTS, GET_ACTIVITIES, AUTH_ADMIN, GET_ALL_USERS, GET_USER
} from "./type";

const ROOT_URL = 'http://localhost:8080';

export const getInfoAboutNumber = ({number}) => async dispatch => {
    try {
        const data = await axios.get(`${ROOT_URL}/api/accountNumber/${number}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }); // we do not have api :/

        console.log(data);

        dispatch({type: NUMBER_INFO, payload: data})
    } catch (e) {
        dispatch({type: NUMBER_ERROR});
    }
};

export const signUpUser = ({username, email, password}) => async dispatch => {

    try {
        await axios.post(`${ROOT_URL}/signup/`, {
            username,
            email,
            password
        });

        dispatch({type: USER_ADDED});
    } catch (e) {
        return dispatch(authError('Username already exists in the database'));
    }

};

export const signInUser = ({username, password}) => async dispatch => {
    try {

        const userData = await axios.post(`${ROOT_URL}/login`,
            {
                username,
                password
            });

        setToken(userData.data.Authorization);
        setUserName(userData.data.username);
        console.log(userData.data);
        if (userData.data.isAdmin === "true") {
            setAdminPermission();
        }

        if (userData.data.isAdmin === "true") {
            dispatch({type: AUTH_ADMIN, payload: userData.data});
        } else {
            dispatch({type: AUTH_USER, payload: userData.data});
        }


    } catch (e) {
        console.log(e);
        return dispatch(authError('Username or password is incorrect!'));
    }
};

export const signOutUser = () => {
    removeToken();
    removeUserName();
    removeAdminPermission();
    return {type: UNAUTH_USER};
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
};

export const sendThumbs = (number, value) => async dispatch => {
    try {

        const res = await axios.put(`${ROOT_URL}/api/accountNumber/thumb/${number}?thumb=${value}`, {}, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        dispatch({type: THUMBS_UPDATA, payload: res})
    } catch (e) {
        dispatch({type: THUMBS_ERROR});
    }
};

export const openModal = () => dispatch => {
    dispatch({type: OPEN_MODAL});
};

export const addComment = (number, comment) => async dispatch => {
    try {
        const response = await axios.put(`${ROOT_URL}/api/accountNumber/comment/${number}`, `${comment}`, {
            headers: {
                'Authorization': `${getToken()}`,
                "Content-Type": "text/plain; charset=utf-8"
            }
        });
        dispatch({type: ADD_COMMENTS, payload: response});
    } catch (e) {
        console.error(e);
    }
};

export const removeComment = (id) => async dispatch => {
    try {
        await axios.delete(`${ROOT_URL}/api/user/comment/${id}`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });
    } catch (e) {
        console.error(e);
    }
};

export const getActivities = () => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}/api/user/`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });

        dispatch({type: GET_ACTIVITIES, payload: response});
    } catch (e) {
        console.error(e);
    }
};

export const getUsers = () => async dispatch => {
    try {
        const {data: {users}} = await axios.get(`${ROOT_URL}/api/admin/userslist/`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        console.log(users);

        dispatch({type: GET_ALL_USERS, payload: users});
    } catch (e) {
        console.error(e);
    }
};

export const getUser = username => async dispatch => {
    try {
        const {data: user} = await axios.get(`${ROOT_URL}/api/admin/user/${username}`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        console.log(user);

        dispatch({type: GET_USER, payload: user});
    } catch (e) {
        console.error(e);
    }
};

export const deleteUser = username => async dispatch => {
    try {
        await axios.delete(`${ROOT_URL}/api/admin/user/${username}`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        console.log("USER DELETED");
    } catch (e) {
        console.log(e);
    }
};

export const deleteThumb = (username, id) => async dispatch => {
    try {
        await axios.delete(`${ROOT_URL}/api/admin/user/${username}/number/${id}`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        console.log("THUMB DELETED");
    } catch (e) {
        console.log(e);
    }
};

export const deleteComment = (username, id) => async dispatch => {
    try {
        await axios.delete(`${ROOT_URL}/api/admin/user/${username}/comment/${id}`, {
            headers: {
                'Authorization': `${getToken()}`
            }
        });
        console.log("THUMB DELETED");
    } catch (e) {
        console.log(e);
    }
};
