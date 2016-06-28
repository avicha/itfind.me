import {
    connect
} from 'react-redux'
import EditModal from '../../components/article_category/edit_modal'
import {
    setEditModalStatus,
    requestCreate,
    requestUpdate,
} from '../../actions/article_category';

const mapStateToProps = (state, ownProps) => ({
    edit_modal_status: state.edit_modal_status,
    article_category: state.article_category
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setEditModalStatus: (visibility) => {
            dispatch(setEditModalStatus(visibility));
        },
        requestUpdate: (article_category) => {
            dispatch(requestUpdate(article_category));
        },
        requestCreate: (article_category) => {
            dispatch(requestCreate(article_category));
        }
    };
}

const ArticleCategoryEditModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditModal)

export default ArticleCategoryEditModal