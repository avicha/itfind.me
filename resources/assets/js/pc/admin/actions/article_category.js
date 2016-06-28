import ArticleCategory from 'models/article_category'
import action_types from '../constants/actions'
import visibility_types from '../constants/visibility'
import {
    receiveError
} from './global'

let requestList = (filter = {}) => {
    return (dispatch) => {
        return ArticleCategory.list(filter).then(json => {
            if (json.code === 0) {
                dispatch(receiveList(json.data))
            } else {
                dispatch(receiveError(json.msg))
            }
        });
    }
}
let receiveList = (data) => {
    return {
        type: action_types.article_category.RECEIVE_LIST,
        data: data.map(article_category => new ArticleCategory(article_category)),
    }
}
let setEditModalStatus = (visibility) => {
    return {
        type: action_types.article_category.SET_EDIT_MODAL_STATUS,
        data: visibility,
    }
}
let newObject = () => {
    return {
        type: action_types.article_category.NEW_OBJECT,
        data: {},
    };
}
let updateObject = (article_category) => {
    return {
        type: action_types.article_category.UPDATE_OBJECT,
        data: {
            id: article_category.id,
            name: article_category.name
        }
    }
}
let requestCreate = (data) => {
    return (dispatch) => {
        let article_category = new ArticleCategory(data);
        return article_category.create().then(json => {
            if (json.code === 0) {
                dispatch(receiveCreate(article_category));
            } else {
                dispatch(receiveError(json.msg))
            }
            dispatch(setEditModalStatus(visibility_types.HIDDEN));
        });
    }
}
let receiveCreate = (data) => {
    return {
        type: action_types.article_category.RECEIVE_CREATE,
        data,
    }
}
let requestUpdate = (data) => {
    return (dispatch) => {
        let article_category = new ArticleCategory(data);
        return article_category.update().then(json => {
            if (json.code === 0) {
                dispatch(receiveUpdate(article_category));
            } else {
                dispatch(receiveError(json.msg))
            }
            dispatch(setEditModalStatus(visibility_types.HIDDEN));
        });
    }
}
let receiveUpdate = (data) => {
    return {
        type: action_types.article_category.RECEIVE_UPDATE,
        data,
    }
}
let requestRemove = (id) => {
    return (dispatch) => {
        let article_category = new ArticleCategory({
            id: id
        });
        return article_category.remove().then(json => {
            if (json.code === 0) {
                dispatch(receiveRemove(article_category));
            } else {
                dispatch(receiveError(json.msg))
            }
        });
    }
}
let receiveRemove = (data) => {
    return {
        type: action_types.article_category.RECEIVE_REMOVE,
        data,
    }
}
export {
    requestList,
    setEditModalStatus,
    newObject,
    updateObject,
    requestCreate,
    requestUpdate,
    requestRemove
}