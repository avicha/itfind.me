import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Menu from '../../components/menu';
import ArticleCategoryNav from '../../components/article_category/nav';
import ArticleCategoryTable from '../../components/article_category/table';
import ArticleCategoryEditModal from '../../components/article_category/edit_modal';
import visibility_types from '../../constants/visibility';
import {
    requestList,
    requestRemove,
    requestCreate,
    requestUpdate,
    newObject,
    updateObject,
    setEditModalStatus
} from '../../actions/article_category';

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
                onCreateBtnClick={()=>{
                    dispatch(newObject());
                    dispatch(setEditModalStatus(visibility_types.VISIBLE));
                }}
            />
            <ArticleCategoryTable
                article_categories={article_categories}
                requestList={() => {
                    dispatch(requestList());
                }}
                onEditBtnClick={(article_category) => {
                    dispatch(updateObject(article_category));
                    dispatch(setEditModalStatus(visibility_types.VISIBLE));
                }}
                requestRemove={(id) => {
                    dispatch(requestRemove(id));
                }}
            />
            <ArticleCategoryEditModal
                edit_modal_status={edit_modal_status}
                article_category={article_category}
                setEditModalStatus={(visibility) => {
                    dispatch(setEditModalStatus(visibility));
                }}
                requestUpdate={(article_category) => {
                    dispatch(requestUpdate(article_category));
                }}
                requestCreate={(article_category) => {
                    dispatch(requestCreate(article_category));
                }}
            />
        </div>
    </div>
)
export default connect(mapStateToProps)(ArticleCategoryListContainer)
