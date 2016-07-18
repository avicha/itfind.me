import React from 'react';

const ArticleDetailNav = ({
    article
}) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <p className="navbar-text navbar-left">文章预览-{article && article.title || ''}</p>
                </div>
            </div>
        </nav>
    );
}
export default ArticleDetailNav;