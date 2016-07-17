import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ArticleCategoryList from '../../components/article_category/list';

const mapStateToProps = (state, ownProps) => {
    return {
        article_categories: state.article_categories,
    };
};
const ArticleCategoryListContainer = ({
    params,
    location,
    article_categories,
    dispatch,
}) => {
    return (
        <div className="page" id="page-article-category-list">
            <Header has_back={false} title="文章分类" />
            <ArticleCategoryList article_categories={article_categories} dispatch={dispatch} blog_id={params.blog_id} />
            <Footer current_location={location.pathname} blog_id={params.blog_id} />
        </div>
    );
}
export default connect(mapStateToProps)(ArticleCategoryListContainer)