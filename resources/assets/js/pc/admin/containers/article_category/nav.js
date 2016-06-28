import {
    connect
} from 'react-redux'
import Nav from '../../components/article_category/nav'
import visibility_types from '../../constants/visibility'
import {
    setEditModalStatus,
    newObject,
} from '../../actions/article_category'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCreateArticleCategoryBtnClick: () => {
        dispatch(newObject());
        dispatch(setEditModalStatus(visibility_types.VISIBLE));
    }
})

const articleCategoryNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)

export default articleCategoryNav