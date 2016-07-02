import React, {
    Component
} from 'react';
import {
    requestArticleList,
    requestArticleRemove,
} from '../../actions/article';

class ArticleTable extends Component {
    componentDidMount() {
        this.props.dispatch(requestArticleList());
    }
    removeBtnClick(article) {
        if (window.confirm('是否确认删除文章分类-' + article.title + '？')) {
            this.props.dispatch(requestArticleRemove(article.id));
        }
    }
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>文章分类</th>
                        <th>标签</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.articles.map((article)=>{
                        return <tr key={article.id}><td>{article.title}</td><td>{article.category.name}</td><td>{article.tags}</td><td>{article.created_at}</td><td><a className="btn btn-info btn-xs" href={'/article/' + article.id + '/edit'}><span className="glyphicon glyphicon-edit"></span> 编辑</a> <a className="btn btn-danger btn-xs" onClick={this.removeBtnClick.bind(this, article)}><span className="glyphicon glyphicon-remove"></span> 删除</a></td></tr>;
                    })}
                </tbody>
            </table>
        );
    }
}
export default ArticleTable