import {GET_ACTIVITIES} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        default:
            return state;
    }
}