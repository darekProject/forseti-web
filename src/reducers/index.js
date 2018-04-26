import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import numReducer from './numReducer';
import authReducer from "./authReducer";

const rootReducers = combineReducers({
    form,
    number: numReducer,
    user: authReducer
});

export default rootReducers;