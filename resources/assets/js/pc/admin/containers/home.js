import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import $ from 'jquery';
import Menu from '../components/menu';

const HomeContainer = () => {
    let blog = $('meta[name="blog"]').attr('content');
    if (blog) {
        blog = JSON.parse(blog);
        return (
            <div className="row">
                <div className="col-md-3">
                    <Menu />
                </div>
                <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-heading clearfix">
                            <a className="btn btn-info pull-right" href={'/blog/' + blog.id + '/edit'}>设置</a>
                            <h3 className="panel-title">博客基本信息</h3>
                        </div>
                        <div className="panel-body">
                            <h3>您的博客：{blog.title}</h3>
                            <p>简介：{blog.intro}</p>
                            <p className="meta"><span>访问数：{blog.views_count}</span><span>文章数：{blog.articles_count}</span></p>
                            <p>
                                <span>常用操作：</span>
                                <a className="btn btn-default" href="/article/create">写文章</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="well">
                你还未开通博客。<a className="btn btn-info" href="/blog/create">马上开通博客</a>
            </div>
        );
    }
}
export default HomeContainer;