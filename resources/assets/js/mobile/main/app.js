import 'babel-polyfill';
import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import FastClick from 'fastclick';
import {
    Route,
    Router,
    browserHistory
} from 'react-router';
import app_reducers from './reducers';
import configureStore from './stores/configure_store';
import BlogIndex from './containers/blog/index';

FastClick.attach(document.body);
let store = configureStore(app_reducers);
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/blog/:id" component={BlogIndex} />
        </Router>
    </Provider>,
    document.getElementById('root')
)