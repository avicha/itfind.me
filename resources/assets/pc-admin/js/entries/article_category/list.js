import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider,
} from 'react-redux';
import article_category_reducers from '../../reducers/article_category';
import configureStore from '../../stores/configure_store';
import ArticleCategoryListApp from '../../containers/article_category/list';

let store = configureStore(article_category_reducers);
render(
    <Provider store={store}>
        <ArticleCategoryListApp />
    </Provider>,
    document.getElementById('root')
)