import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import $ from 'jquery';
import Menu from '../../components/menu';
import BlogEditNav from '../../components/blog/edit_nav';
import BlogEditForm from '../../components/blog/edit_form';

const BlogEditContainer = ({
    dispatch,
}) => {
    let blog_id = $('meta[name="blog-id"]').attr('content');
    let is_create_blog = !blog_id;
    let nick = $('meta[name="nick"]').attr('content');
    if (!is_create_blog) {
        return (
            <div className="row">
                <div className="col-md-3">
                    <Menu />
                </div>
                <div className="col-md-9">
                    <BlogEditNav
                        is_create_blog={is_create_blog} 
                    />
                    <BlogEditForm
                        blog_id={blog_id}
                        nick={nick}
                        dispatch={dispatch}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="panel panel-default">
                <BlogEditNav
                    is_create_blog={is_create_blog} 
                />
                <BlogEditForm
                    blog_id={blog_id}
                    nick={nick}
                    dispatch={dispatch}
                />
            </div>
        );
    }
}
export default connect()(BlogEditContainer)