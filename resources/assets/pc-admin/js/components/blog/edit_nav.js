import React from 'react';

const BlogEditNav = ({
    is_create_blog
}) => {
    let header;
    if (is_create_blog) {
        header = <p className="navbar-text navbar-left">开通博客</p>;
    } else {
        header = <p className="navbar-text navbar-left">博客设置</p>;
    }
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    {header}
                </div>
            </div>
        </nav>
    );
}
export default BlogEditNav;