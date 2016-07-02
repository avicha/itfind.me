import React, {
    Component
} from 'react';
import {
    requestArticleCategoryList,
    requestArticleCategoryRemove,
    updateArticleCategoryObject,
    setArticleCategoryEditModalStatus
} from '../../actions/article_category';
import visibility_types from '../../constants/visibility';

class ArticleCategoryTable extends Component {
    componentDidMount() {
        this.props.dispatch(requestArticleCategoryList());
    }
    handleEditBtnClick(article_category) {
        this.props.dispatch(updateArticleCategoryObject(article_category));
        this.props.dispatch(setArticleCategoryEditModalStatus(visibility_types.VISIBLE));
    }
    removeBtnClick(article_category) {
        if (window.confirm('是否确认删除文章分类-' + article_category.name + '？')) {
            this.props.dispatch(requestArticleCategoryRemove(article_category.id));
        }
    }
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>是否系统分类</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.article_categories.map((article_category)=>{
                        return <tr key={article_category.id}><td>{article_category.name}</td><td>{article_category.is_systemic?'是':'否'}</td><td><a className="btn btn-info btn-xs" onClick={this.handleEditBtnClick.bind(this, article_category)}><span className="glyphicon glyphicon-edit"></span> 编辑</a> <a className="btn btn-danger btn-xs" onClick={this.removeBtnClick.bind(this, article_category)}><span className="glyphicon glyphicon-remove"></span> 删除</a></td></tr>
                    })}
                </tbody>
            </table>
        );
    }
}
export default ArticleCategoryTable