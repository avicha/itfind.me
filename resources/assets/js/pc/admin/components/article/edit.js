import React, {
    Component
} from 'react';
export default class ArticleEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }
    componentDidMount() {
        this.setState({
            categories: [{
                id: 1,
                name: '测试'
            }]
        });
        this.content_editor = $('#content-textarea').summernote({
            height: 300,
            lang: 'zh-CN'
        });
    }
    render() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label for="title-input" className="col-sm-1 control-label">标题</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="title-input" placeholder="请输入文章标题" value={this.state.article?this.state.article.title:''}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="category-selector" className="col-sm-1 control-label">分类</label>
                    <div className="col-sm-9">
                        <select className="form-control" id="category-selector">
                            {this.state.categories.map((category)=>{
                                return <option value={category.id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label for="content-textarea" className="col-sm-1 control-label">正文</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" value="" id="content-textarea"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <label for="tags-input" className="col-sm-1 control-label">标签</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="tags-input" placeholder="请输入文章标签，用,分割词语" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-9">
                        <button type="submit" className="btn btn-primary">保存</button>
                    </div>
                </div>
            </form>
        );
    }
}