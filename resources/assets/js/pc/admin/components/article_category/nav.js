import React, {
    Component
} from 'react';
import {
    newArticleCategoryObject,
    setArticleCategoryEditModalStatus
} from '../../actions/article_category';
import visibility_types from '../../constants/visibility';

class ArticleCategoryNav extends Component {
    handleCreateBtnClick() {
        this.props.dispatch(newArticleCategoryObject());
        this.props.dispatch(setArticleCategoryEditModalStatus(visibility_types.VISIBLE));
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <p className="navbar-text navbar-left">文章分类列表</p>
                        <button className="btn btn-primary navbar-btn navbar-right" onClick={this.handleCreateBtnClick.bind(this)}>添加分类</button>
                    </div>
                </div>
            </nav>
        );
    }
}
export default ArticleCategoryNav