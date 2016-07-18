import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import article_reducers from '../../reducers/article';
import configureStore from '../../stores/configure_store';
import ArticleDetailApp from '../../containers/article/detail';

let store = configureStore(article_reducers);
render(
    <Provider store={store}>
        <ArticleDetailApp />
    </Provider>,
    document.getElementById('root')
)