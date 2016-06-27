import React, {
    Component
} from 'react';
import {
    requestList
} from '../../actions/article_category';
class ArticleCategoryTable extends Component {
    componentDidMount() {
        let {
            dispatch
        } = this.props;
        dispatch(requestList());
    }
    render() {
        let {
            article_categories
        } = this.props;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {article_categories.map((article_category)=>{
                        return <tr key={article_category.id}><td>{article_category.name}</td><td><a className="btn btn-info btn-xs"><span className="glyphicon glyphicon-edit"></span> 编辑</a> <a className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-remove"></span> 删除</a></td></tr>
                    })}
                </tbody>
            </table>
        )
    }
}
export default ArticleCategoryTable