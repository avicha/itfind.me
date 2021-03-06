import React from 'react';
const Menu = () => {
    let url = window.location.pathname;
    return (
        <div className="panel-group" role="tablist" aria-multiselectable="true">
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="article-manage-tab">
                    <h4 className="panel-title">
                        <a role="button" data-toggle="collapse" href="#article-manage">
                        文章管理
                        </a>
                    </h4>
                </div>
                <div id="article-manage" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="article-manage-tab">
                    <ul className="nav nav-pills nav-stacked">
                        <li className={url == '/article_category'? 'active':''}>
                            <a href="/article_category">分类管理</a>
                        </li>
                        <li className={url == '/article'? 'active':''}>
                            <a href="/article">文章列表</a>
                        </li>
                        <li className={url == '/article/create'? 'active' : ''}>
                            <a href="/article/create">写文章</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="blog-manage-tab">
                    <h4 className="panel-title">
                        <a role="button" data-toggle="collapse" href="#blog-manage">
                        我的博客
                        </a>
                    </h4>
                </div>
                <div id="blog-manage" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="blog-manage-tab">
                    <ul className="nav nav-pills nav-stacked">
                        <li className={url == '/blog/edit'? 'active':''}>
                            <a href="/blog/edit">博客设置</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Menu