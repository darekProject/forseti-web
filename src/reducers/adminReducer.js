import {GET_ALL_USERS, GET_USER} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state
    }
}