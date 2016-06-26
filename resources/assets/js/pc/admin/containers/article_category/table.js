import {
    connect
} from 'react-redux'
import Table from '../../components/article_category/table'

const mapStateToProps = (state, ownProps) => ({
    article_categories: state.article_categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch: dispatch
})


const ArticleCategoryTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)

export default ArticleCategoryTable