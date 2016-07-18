import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ArticleList from '../../components/article/list';

const mapStateToProps = (state, ownProps) => {
    return {
        article_category: state.article_category,
        articles: state.articles,
    };
};
const ArticleListContainer = ({
    params,
    location,
    articles,
    article_category,
    dispatch,
}) => {
    return (
        <div className="page" id="page-article-category-article-list">
            <Header has_back={true} title={article_category.name} />
            <ArticleList articles={articles} dispatch={dispatch} blog_id={params.blog_id} category_id={params.category_id} />
            <Footer current_location={location.pathname} blog_id={params.blog_id} />
        </div>
    );
}
export default connect(mapStateToProps)(ArticleListContainer)