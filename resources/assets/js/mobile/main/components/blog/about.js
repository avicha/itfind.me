import React, {
    Component
} from 'react';
import {
    requestBlogFetch,
} from '../../actions/blog';


export default class BlogAbout extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(requestBlogFetch(this.props.blog_id));
    }
    render() {
        let {
            blog
        } = this.props;
        return (
            <div className="blog-about">
                <img className="avatar" src={blog.user && blog.user.avatar ? blog.user.avatar : '/assets/img/pc/default_avatar.jpg'} />
                <div className="user-info">
                    <p>
                        <span className="label">昵称：</span>
                        <span className="value">{blog.user && blog.user.nick}</span>
                    </p>
                    <p>
                        <span className="label">简介：</span>
                        <span className="value">{blog.intro || '这个博主很懒，什么简介都没有。'}</span>
                    </p>
                </div>
                <div className="blog-info">
                    <p>
                        <span className="label">文章数：</span>
                        <span className="value">{blog.articles_count || 0}</span>
                    </p>
                    <p>
                        <span className="label">浏览量：</span>
                        <span className="value">{blog.views_count || 0}</span>
                    </p>
                </div>
            </div>
        );
    }
}