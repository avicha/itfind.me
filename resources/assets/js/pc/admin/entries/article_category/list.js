import React from 'react'
import {
    render
} from 'react-dom'
import {
    Provider
} from 'react-redux'
import {
    createStore
} from 'redux'
import article_category_list from '../../reducers/article_category/list'
import Menu from '../../containers/menu';
import ArticleCategoryNav from '../../containers/article_category/nav';
import ArticleCategoryTable from '../../containers/article_category/table';
import ArticleCategoryEditModal from '../../containers/article_category/edit_modal';

let store = createStore(article_category_list)
const ArticleCategoryListContainer = () => (
    <div className="row">
        <div id="left-panel" className="col-md-3">
            <Menu />
        </div>
        <div id="right-panel" className="col-md-9">
            <ArticleCategoryNav />
            <ArticleCategoryTable />
            <ArticleCategoryEditModal />
        </div>
    </div>
)
render(
    <Provider store={store}>
        <ArticleCategoryListContainer />
    </Provider>,
    document.getElementById('root')
)