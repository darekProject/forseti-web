import {AUTH_USER, USER_ADDED, AUTH_ERROR, UNAUTH_USER, AUTH_ADMIN} from '../actions/type';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_ADDED:
            return {
                ...state,
                userAdded: true
            };
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                authUser: action.payload,
                admin: false,
                userAdded: true
            };
        case AUTH_ADMIN: {
            return {
                ...state,
                authenticated: true,
                authUser: action.payload,
                admin: true,
                userAdded: true
            };
        }
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false,
                admin: false,
                userAdded: false
            };
        default:
            return state;
    }
};