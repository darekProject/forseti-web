import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './containers/App';
import SignIn from './comonents/SignIn/SignIn';
import SignUp from './comonents/SignUp/SignUp';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Route exact path="/" component={App}/>
                <Route exact path="/SignIn" component={SignIn}/>
                <Route exact path="/SignUp" component={SignUp}/>
            </Fragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
