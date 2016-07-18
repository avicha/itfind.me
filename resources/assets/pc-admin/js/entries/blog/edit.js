import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import blog_reducers from '../../reducers/blog';
import configureStore from '../../stores/configure_store';
import BlogEditApp from '../../containers/blog/edit';

let store = configureStore(blog_reducers);
render(
    <Provider store={store}>
        <BlogEditApp />
    </Provider>,
    document.getElementById('root')
)