import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import article_reducers from '../../reducers/article';
import configureStore from '../../stores/configure_store';
import ArticleListApp from '../../containers/article/list';

let store = configureStore(article_reducers);
render(
    <Provider store={store}>
        <ArticleListApp />
    </Provider>,
    document.getElementById('root')
)