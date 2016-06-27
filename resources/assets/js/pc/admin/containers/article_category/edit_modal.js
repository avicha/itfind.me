import {
    connect
} from 'react-redux'
import EditModal from '../../components/article_category/edit_modal'

const mapStateToProps = (state, ownProps) => ({
    edit_modal_status: state.edit_modal_status,
    cid: '',
    name: '',
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    };
}

const ArticleCategoryEditModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditModal)

export default ArticleCategoryEditModal