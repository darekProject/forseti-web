import {NUMBER_ERROR, NUMBER_OK} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case NUMBER_OK:
            return {
                ...state,
                data: action.payload
            };
        case NUMBER_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}