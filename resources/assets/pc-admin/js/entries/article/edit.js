import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import article_reducers from '../../reducers/article';
import configureStore from '../../stores/configure_store';
import ArticleEditApp from '../../containers/article/edit';

let store = configureStore(article_reducers);
render(
    <Provider store={store}>
        <ArticleEditApp />
    </Provider>,
    document.getElementById('root')
)