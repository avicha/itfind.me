import React from 'react';

const ArticleEditNav = ({
    is_create_article
}) => {
    let header;
    if (is_create_article) {
        header = <p className="navbar-text navbar-left">写文章</p>;
    } else {
        header = <p className="navbar-text navbar-left">修改文章</p>;
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
export default ArticleEditNav;