import {
    connect
} from 'react-redux'
import Nav from '../../components/article_category/nav'
import visibility_types from '../../constants/visibility'
import {
    setArticleCategoryEditModalStatus
} from '../../actions/article_category'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch: dispatch,
    onCreateArticleCategoryBtnClick: () => {
        dispatch(setArticleCategoryEditModalStatus(visibility_types.VISIBLE));
    }
})


const articleCategoryNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)

export default articleCategoryNav