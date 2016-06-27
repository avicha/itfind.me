import ArticleCategory from 'models/article_category'
import action_types from '../constants/actions'
let requestList = (filter = {}) => {
    return (dispatch) => {
        return ArticleCategory.list(filter).then(json => {
            if (json.code === 0) {
                dispatch(receiveList(null, json.data))
            } else {
                dispatch(receiveList(json.msg))
            }
        });
    }
}
let receiveList = (error, data) => {
    return {
        type: action_types.article_category.RECEIVE_LIST,
        data,
        error: error
    }
}
let setArticleCategoryEditModalStatus = (visibility) => {
    return {
        type: action_types.article_category.SET_EDIT_MODAL_STATUS,
        data: visibility,
    }
}
export {
    requestList,
    receiveList,
    setArticleCategoryEditModalStatus,
}