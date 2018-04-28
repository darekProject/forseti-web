import {NUMBER_ERROR, NUMBER_OK, THUMBS_ERROR, THUMBS_UPDATA} from "../actions/type";

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
        case THUMBS_UPDATA:
            return {
                ...state,
                thumbsSet: action.payload.status,
                data: action.payload.data
            };
        case THUMBS_ERROR:
            return {
                ...state,
                thumbsSetError: true
            };
        default:
            return state;
    }
}