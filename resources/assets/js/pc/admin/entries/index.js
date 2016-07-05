import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import blog_reducers from '../../reducers/blog';
import configureStore from '../../stores/configure_store';
import HomeApp from '../../containers/home';

let store = configureStore(blog_reducers);
render(
    <Provider store={store}>
        <HomeApp />
    </Provider>,
    document.getElementById('root')
)