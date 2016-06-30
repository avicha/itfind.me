import React, {
    Component
} from 'react';
import $ from 'jquery';
import {
    requestList as requestArticleCategories,
} from '../../actions/article_category';

export default class ArticleEditForm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(requestArticleCategories());
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
    }
    render() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label for="title-input" className="col-sm-1 control-label">标题</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="title-input" placeholder="请输入文章标题"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="category-selector" className="col-sm-1 control-label">分类</label>
                    <div className="col-sm-8">
                        <select className="form-control" id="category-selector">
                            {this.props.article_categories.map((article_categoriy)=>{
                                return <option value={article_categoriy.id}>{article_categoriy.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label for="tags-input" className="col-sm-1 control-label">标签</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="tags-input" placeholder="请输入文章标签，用,分割词语" />
                    </div>
                </div>
                <div className="form-group">
                    <label for="content-textarea" className="col-sm-1 control-label">正文</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" value="" id="content-textarea"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-8">
                        <button type="submit" className="btn btn-primary">保存</button>
                    </div>
                </div>
            </form>
        );
    }
}