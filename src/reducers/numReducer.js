import {
    NUMBER_ERROR,
    THUMBS_ERROR,
    THUMBS_UPDATA,
    NUMBER_INFO,
    ADD_COMMENTS,
    REMOVE_COMMENTS
} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case NUMBER_ERROR:
            return {
                ...state,
                error: true
            };
        case NUMBER_INFO:
            return {
                ...state,
                infoData: action.payload,
                data: action.payload.data
            };
        case THUMBS_UPDATA:
            return {
                ...state,
                thumbsSet: action.payload.status,
                data: action.payload.data,
                infoData: action.payload
            };
        case THUMBS_ERROR:
            return {
                ...state,
                thumbsSetError: true
            };
        case ADD_COMMENTS:
            return {
                ...state,
                infoData: action.payload
            };
        case REMOVE_COMMENTS:
            return {
                ...state,
                infoData: action.payload
            };
        default:
            return state;
    }
}