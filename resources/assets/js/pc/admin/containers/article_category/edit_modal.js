import {
    connect
} from 'react-redux'
import EditModal from '../../components/article_category/edit_modal'

const mapStateToProps = (state, ownProps) => ({
    edit_modal_status: state.edit_modal_status
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const ArticleCategoryEditModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditModal)

export default ArticleCategoryEditModal