import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter,} from 'react-router-dom';
import {getToken} from "./utils/utlis";
import {AUTH_USER} from "./actions/type";

import './index.css';

import App from './containers/App';
import SignIn from './comonents/SignIn/SignIn';
import SignUp from './comonents/SignUp/SignUp';
import ViewInfo from "./containers/ViewInfo/ViewInfo";
import Activities from "./comonents/Activities/Activities";
import IndexPage from "./comonents/IndexPage/IndexPage";
import Redirect from "./comonents/AuthHoC/AuthHoC";
import UserDTOPage from "./containers/UserDTOPage/UserDTOPage";
import AdminPage from "./containers/AdminPage/AdminPage";

import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = getToken();
if (token) {
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Route path="/" component={App}/>
                <Route exact path="/"  component={IndexPage}/>
                <Route path="/getinfo" component={ViewInfo}/>
                <Route exact path="/SignIn" component={SignIn}/>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route path="/getactivities" component={Redirect(Activities)}/>
                <Route path="/admin/getUser" component={Redirect(AdminPage)}/>
                <Route path="/admin/user/:user" component={Redirect(UserDTOPage)} />
            </Fragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
