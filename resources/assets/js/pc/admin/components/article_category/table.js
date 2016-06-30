import React, {
    Component
} from 'react';

class ArticleCategoryTable extends Component {
    componentDidMount() {
        this.props.requestList();
    }
    removeBtnClick(article_category) {
        if (window.confirm('是否确认删除文章分类-' + article_category.name + '？')) {
            this.props.requestRemove(article_category.id);
        }
    }
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名称</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.article_categories.map((article_category)=>{
                        return <tr key={article_category.id}><td>{article_category.id}</td><td>{article_category.name}</td><td><a className="btn btn-info btn-xs" onClick={this.props.onEditBtnClick.bind(this, article_category)}><span className="glyphicon glyphicon-edit"></span> 编辑</a> <a className="btn btn-danger btn-xs" onClick={this.removeBtnClick.bind(this, article_category)}><span className="glyphicon glyphicon-remove"></span> 删除</a></td></tr>
                    })}
                </tbody>
            </table>
        );
    }
}
export default ArticleCategoryTable