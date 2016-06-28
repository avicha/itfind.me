import {
    connect
} from 'react-redux'
import Table from '../../components/article_category/table'
import {
    requestList,
    updateObject,
    requestRemove,
    setEditModalStatus
} from '../../actions/article_category';
import visibility_types from '../../constants/visibility';

const mapStateToProps = (state, ownProps) => ({
    article_categories: state.article_categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestList: () => {
        dispatch(requestList());
    },
    onEditBtnClick: (article_category) => {
        dispatch(updateObject(article_category));
        dispatch(setEditModalStatus(visibility_types.VISIBLE));
    },
    requestRemove: (id) => {
        dispatch(requestRemove(id));
    }
})

const ArticleCategoryTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)

export default ArticleCategoryTable