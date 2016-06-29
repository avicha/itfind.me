import React from 'react';
import {
    render
} from 'react-dom'
import {
    Provider,
} from 'react-redux'
import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware
} from 'redux'
import article_category_reducers from '../../reducers/article_category'
import ArticleCategoryListContainer from '../../containers/article_category/list'

let store = createStore(article_category_reducers, applyMiddleware(thunk))
render(
    <Provider store={store}>
        <ArticleCategoryListContainer />
    </Provider>,
    document.getElementById('root')
)