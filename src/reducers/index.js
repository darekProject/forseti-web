import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import numReducer from './numReducer';

const rootReducers = combineReducers({
    form,
    number: numReducer
});

export default rootReducers;