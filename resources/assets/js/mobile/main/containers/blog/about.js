import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Header from '../../components/header';
import Footer from '../../components/footer';
import BlogAbout from '../../components/blog/about';

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blog,
    };
};
const BlogAboutContainer = ({
    params,
    location,
    blog,
    dispatch,
}) => {
    
    return (
        <div className="page" id="page-blog-about">
            <Header has_back={false} title={blog.title} />
            <BlogAbout blog={blog} dispatch={dispatch} blog_id={params.blog_id} />
            <Footer current_location={location.pathname} blog_id={params.blog_id} />
        </div>
    );
}
export default connect(mapStateToProps)(BlogAboutContainer)