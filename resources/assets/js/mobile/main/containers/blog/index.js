import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import BlogNav from '../../components/blog/index_nav';
import BlogMenu from '../../components/blog/blog_menu';
import NewestArticleList from '../../components/article/newest_list';

const mapStateToProps = (state, ownProps) => {
    return {
        blog_id: state.blog_id,
        newest_articles: state.newest_articles,
    };
};
const BlogIndexContainer = ({
    params,
    location,
    blog_id,
    newest_articles,
    dispatch,
}) => (
    <div className="page" id="page-blog-index">
        <BlogNav />
        <NewestArticleList newest_articles={newest_articles} dispatch={dispatch} blog_id={blog_id} />
        <div className="bottom"></div>
        <BlogMenu current_location={location.pathname} nick={params.nick} />
    </div>
);
export default connect(mapStateToProps)(BlogIndexContainer)