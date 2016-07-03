import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Menu from '../../components/menu';
import ArticleEditNav from '../../components/article/edit_nav';
import ArticleEditForm from '../../components/article/edit_form';

const mapStateToProps = (state, ownProps) => {
    return {
        article_categories: state.article_categories
    };
};
const ArticleEditContainer = ({
    dispatch,
    article_categories,
}) => {
    let pathname = window.location.pathname;
    let is_create_article = /^\/article\/create/.test(pathname);
    let article_id = /^\/article\/(\d+)\/edit/.test(pathname) ? pathname.match(/^\/article\/(\d+)\/edit/)[1] : '';
    return (
        <div className="row">
            <div className="col-md-3">
                <Menu />
            </div>
            <div className="col-md-9">
                <ArticleEditNav
                    is_create_article={is_create_article} 
                />
                <ArticleEditForm
                    article_categories={article_categories}
                    article_id={article_id}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
}
export default connect(mapStateToProps)(ArticleEditContainer)