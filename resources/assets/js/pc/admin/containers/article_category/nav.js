import {
    connect
} from 'react-redux'
import Nav from '../../components/article_category/nav'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCreateArticleCategoryBtnClick: () => {
        console.log('hello');
    }
})


const articleCategoryNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)

export default articleCategoryNav