import React, {
    Component
} from 'react';
import ArticleCategoryModel from 'models/article_category';
export default class ArticleCategoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article_categories: []
        };
    }
    componentDidMount() {
        let self = this;
        ArticleCategoryModel.list().done(res => {
            let article_categories = res.data.map(article_category => new ArticleCategoryModel(article_category));
            this.setState({
                article_categories: article_categories
            });
        });
    }
    createArticleCategory(article_category) {
        this.state.article_categories.push(article_category);
        this.setState(this.state);
    }
    handleArticleCategoryRemove(id) {
        let index = this.state.article_categories.findIndex(article_category => article_category.id == id);
        if (~index) {
            let article_category = this.state.article_categories[index];
            if (window.confirm('确认删除文章分类-' + article_category.name + '?')) {
                article_category.remove().done(() => {
                    alert('删除成功');
                    this.state.article_categories.splice(index, 1);
                    this.setState(this.state);
                });
            }
        }
    }
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.article_categories.map((article_category)=>{
                        return <tr key={article_category.id}><td>{article_category.name}</td><td><a className="btn btn-info btn-xs"><span className="glyphicon glyphicon-edit"></span> 编辑</a> <a className="btn btn-danger btn-xs" onClick={this.handleArticleCategoryRemove.bind(this, article_category.id)}><span className="glyphicon glyphicon-remove"></span> 删除</a></td></tr>
                    })}
                </tbody>
            </table>
        );
    }
}