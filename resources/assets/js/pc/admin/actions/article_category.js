import ArticleCategory from 'models/article_category'
import action_types from '../constants/actions'
import visibility_types from '../constants/visibility'

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
        error
    }
}
let setArticleCategoryEditModalStatus = (visibility) => {
    return {
        type: action_types.article_category.SET_EDIT_MODAL_STATUS,
        data: visibility,
    }
}
let requestCreate = (data) => {
    return (dispatch) => {
        let article_category = new ArticleCategory(data);
        return article_category.create().then(json => {
            if (json.code === 0) {
                dispatch(receiveCreate(null, article_category))
                dispatch(setArticleCategoryEditModalStatus(visibility_types.HIDDEN))
            } else {
                dispatch(receiveCreate(json.msg))
            }
        });
    }
}
let receiveCreate = (error, data) => {
    return {
        type: action_types.article_category.RECEIVE_CREATE,
        data,
        error
    }
}
export {
    requestList,
    receiveList,
    setArticleCategoryEditModalStatus,
    requestCreate,
}