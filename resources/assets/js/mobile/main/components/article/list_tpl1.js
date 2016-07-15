import React from 'react';
import {
    Link
} from 'react-router';

const ArticleListTpl1 = ({
    article,
}) => (
    <Link className="article" to={'/article/' + article.id}>
        <div className="title">
            {article.is_top?'【置顶】':''}{article.title}
        </div>
        <img className={article.image?'image':'hidden'} src={article.image} title={article.title} />
        <p className="desc">
            摘要：{article.desc}...
        </p>
        <div className="meta">
            <span className="author">作者：{article.author}</span>
            <span className="created_at">发布于：{article.created_at}</span>
        </div>
    </Link>
)
export default ArticleListTpl1;