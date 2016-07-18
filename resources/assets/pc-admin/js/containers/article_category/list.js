import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Menu from '../../components/menu';
import ArticleCategoryNav from '../../components/article_category/nav';
import ArticleCategoryTable from '../../components/article_category/table';
import ArticleCategoryEditModal from '../../components/article_category/edit_modal';

const mapStateToProps = (state, ownProps) => state;
const ArticleCategoryListContainer = ({
    dispatch,
    article_categories,
    edit_modal_status,
    article_category
}) => (
    <div className="row">
        <div className="col-md-3">
            <Menu />
        </div>
        <div className="col-md-9">
            <ArticleCategoryNav
                dispatch={dispatch}
            />
            <ArticleCategoryTable
                article_categories={article_categories}
                dispatch={dispatch}
            />
            <ArticleCategoryEditModal
                edit_modal_status={edit_modal_status}
                article_category={article_category}
                dispatch={dispatch}
            />
        </div>
    </div>
)
export default connect(mapStateToProps)(ArticleCategoryListContainer)
