import React, {
    Component
} from 'react';
import $ from 'jquery';
import {
    requestArticleCategoryList,
} from '../../actions/article_category';
import {
    requestArticleFetch,
    requestArticleCreate,
    requestArticleUpdate,
    RECEIVE_ARTICLE_FETCH,
    RECEIVE_ARTICLE_CREATE,
    RECEIVE_ARTICLE_UPDATE,
} from '../../actions/article';

export default class ArticleEditForm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.isReady = false;
        this.content_editor = $('#content-textarea').summernote({
            height: 300,
            lang: 'zh-CN',
            toolbar: [
                ['font', ['fontname', 'fontsize', 'color', 'bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['misc', ['fullscreen', 'codeview', 'undo', 'redo']],
                ['paragraph', ['ol', 'ul', 'paragraph', 'height']],
                ['insert', ['picture', 'link', 'video', 'table', 'hr']],
            ]
        });
        this.props.dispatch(requestArticleCategoryList()).then(() => {
            if (this.props.article_id) {
                this.props.dispatch(requestArticleFetch(this.props.article_id)).then(action => {
                    if (action.type == RECEIVE_ARTICLE_FETCH) {
                        let article = action.data;
                        this.refs.title.value = article.title;
                        this.refs.category.value = article.category_id;
                        this.refs.tags.value = article.tags;
                        this.content_editor.summernote('code', article.content);
                        this.isReady = true;
                    }
                });
            } else {
                this.isReady = true;
            }
        });

    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.isReady) {
            window.alert('请先等待数据加载完毕');
        } else {
            let data = {
                title: this.refs.title.value,
                category_id: this.refs.category.value,
                tags: this.refs.tags.value.replace(/，/g, ','),
                content: this.content_editor.summernote('code')
            };
            if (!data.title) {
                window.alert('请输入文章标题');
            } else {
                if (this.props.article_id) {
                    this.props.dispatch(requestArticleUpdate(this.props.article_id, data)).then(action => {
                        if (action.type === RECEIVE_ARTICLE_UPDATE) {
                            window.location.href = '/article/' + this.props.article_id;
                        }
                    });
                } else {
                    this.props.dispatch(requestArticleCreate(data)).then(action => {
                        if (action.type === RECEIVE_ARTICLE_CREATE) {
                            window.location.href = '/article/' + action.data.id;
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
                        <input type="text" className="form-control" id="title-input" ref="title" placeholder="请输入文章标题"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="category-selector" className="col-sm-1 control-label">分类</label>
                    <div className="col-sm-10">
                        <select className="form-control" id="category-selector" ref="category">
                            {this.props.article_categories.map((article_categoriy)=>{
                                return <option value={article_categoriy.id}>{article_categoriy.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="tags-input" className="col-sm-1 control-label">标签</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="tags-input" ref="tags" placeholder="请输入文章标签，用,分割词语" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="content-textarea" className="col-sm-1 control-label">正文</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" value="" id="content-textarea"></textarea>
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