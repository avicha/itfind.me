import React from 'react';
import {
    setEditModalStatus,
    newObject,
} from '../../actions/article_category'
import visibility_types from '../../constants/visibility'

const ArticleCategoryNav = ({
    onCreateBtnClick
}) => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="collapse navbar-collapse">
                <p className="navbar-text navbar-left">文章分类列表</p>
                <button className="btn btn-primary navbar-btn navbar-right" onClick={onCreateBtnClick}>添加分类</button>
            </div>
        </div>
    </nav>
)
export default ArticleCategoryNav