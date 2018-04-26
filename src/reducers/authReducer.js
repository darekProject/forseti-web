import {AUTH_USER, AUTH_ERROR, UNAUTH_USER} from '../actions/type';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                authUser: action.payload
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false
            };
        default:
            return state;
    }
};