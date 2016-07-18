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
        articles: state.articles,
    };
};
const ArticleListContainer = ({
    params,
    location,
    articles,
    dispatch,
}) => {
    return (
        <div className="page" id="page-blog-index">
            <Header has_back={false} title="最新文章" />
            <ArticleList articles={articles} dispatch={dispatch} blog_id={params.blog_id} />
            <Footer current_location={location.pathname} blog_id={params.blog_id} />
        </div>
    );
}
export default connect(mapStateToProps)(ArticleListContainer)