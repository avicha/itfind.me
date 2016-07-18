import React, {
    Component
} from 'react';
import {
    requestBlogFetch,
    requestBlogCreate,
    requestBlogUpdate,
    RECEIVE_BLOG_FETCH,
    RECEIVE_BLOG_CREATE,
    RECEIVE_BLOG_UPDATE,
} from '../../actions/blog';

export default class BlogEditForm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.isReady = false;
        if (this.props.blog_id) {
            this.props.dispatch(requestBlogFetch(this.props.blog_id)).then(action => {
                if (action.type == RECEIVE_BLOG_FETCH) {
                    let blog = action.data;
                    this.refs.title.value = blog.title;
                    this.refs.intro.value = blog.intro;
                    this.isReady = true;
                }
            });
        } else {
            this.isReady = true;
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.isReady) {
            window.alert('请先等待数据加载完毕');
        } else {
            let data = {
                title: this.refs.title.value,
                intro: this.refs.intro.value
            };
            if (!data.title) {
                window.alert('请输入文章标题');
            } else {
                if (this.props.blog_id) {
                    this.props.dispatch(requestBlogUpdate(this.props.blog_id, data)).then(action => {
                        if (action.type === RECEIVE_BLOG_UPDATE) {
                            window.location.href = '/';
                        }
                    });
                } else {
                    this.props.dispatch(requestBlogCreate(data)).then(action => {
                        if (action.type === RECEIVE_BLOG_CREATE) {
                            window.location.href = '/';
                        }
                    });
                }
            }
        }
        return false;
    }
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="title-input" className="col-sm-1 control-label">标题</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title-input" ref="title" placeholder="请输入博客标题" defaultValue={this.props.nick + '的博客'}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="intro-textarea" className="col-sm-1 control-label">分类</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="intro-textarea" ref="intro" placeholder="请输入博客简介"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-10">
                        <button type="submit" className="btn btn-primary">保存</button>
                    </div>
                </div>
            </form>
        );
    }
}