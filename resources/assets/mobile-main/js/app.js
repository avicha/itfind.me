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
    Redirect,
    browserHistory
} from 'react-router';
import app_reducers from './reducers';
import configureStore from './stores/configure_store';
import ArticleList from './containers/article/list';
import ArticleCategoryList from './containers/article_category/list';
import ArticleCategoryArticleList from './containers/article_category/article_list';
import ArticleDetail from './containers/article/detail';
import BlogAbout from './containers/blog/about';

FastClick.attach(document.body);
let store = configureStore(app_reducers);
let rootInstance = render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/blog/:blog_id/article" component={ArticleList} />
            <Route path="/blog/:blog_id/article_category" component={ArticleCategoryList} />
            <Route path="/blog/:blog_id/article_category/:category_id" component={ArticleCategoryArticleList} />
            <Route path="/article/:article_id" component={ArticleDetail} />
            <Route path="/blog/:blog_id" component={BlogAbout} />
        </Router>
    </Provider>,
    document.getElementById('root')
)
if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function() {
            // Help React Hot Loader figure out the root component instances on the page:
            return [rootInstance];
        }
    });
}