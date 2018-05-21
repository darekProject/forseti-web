import {GET_ACCTIVITIES} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ACCTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        default:
            return state;
    }
}