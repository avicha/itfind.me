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
        selected_article_category: state.selected_article_category,
        articles: state.articles,
    };
};
const ArticleListContainer = ({
    params,
    location,
    articles,
    selected_article_category,
    dispatch,
}) => {
    let title = location.query.category_id ? selected_article_category.name : '最新文章';
    return (
        <div className="page" id="page-blog-index">
            <Header has_back={false} title={title} />
            <ArticleList articles={articles} dispatch={dispatch} blog_id={params.blog_id} article_category_id={location.query.category_id} />
            <Footer current_location={location.pathname} blog_id={params.blog_id} />
        </div>
    );
}
export default connect(mapStateToProps)(ArticleListContainer)