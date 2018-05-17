import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Router from 'react-router-dom/HashRouter';
import { Route, Switch } from 'react-router-dom';
import reducers from './reducers';

import Home from './components/Home';
import Order from './components/Order';

import './style/main.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/order" component={Order} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
