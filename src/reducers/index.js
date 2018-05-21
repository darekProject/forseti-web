import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import numReducer from './numReducer';
import authReducer from "./authReducer";
import activitiesUser from "./activitiesUser";

const rootReducers = combineReducers({
    form,
    number: numReducer,
    user: authReducer,
    activities: activitiesUser
});

export default rootReducers;