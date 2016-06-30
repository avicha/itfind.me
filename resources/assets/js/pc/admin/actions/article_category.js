import ArticleCategory from 'models/article_category';
import visibility_types from '../constants/visibility';
import {
    receiveError
} from './global';

export const RECEIVE_LIST = 'RECEIVE_ARTICLE_CATEGORY_LIST';
export const RECEIVE_CREATE = 'RECEIVE_ARTICLE_CATEGORY_CREATE';
export const RECEIVE_UPDATE = 'RECEIVE_ARTICLE_CATEGORY_UPDATE';
export const SET_EDIT_MODAL_STATUS = 'SET_ARTICLE_CATEGORY_EDIT_MODAL_STATUS';
export const NEW_OBJECT = 'NEW_ARTICLE_CATEGORY_OBJECT';
export const UPDATE_OBJECT = 'UPDATE_ARTICLE_CATEGORY_OBJECT';
export const RECEIVE_REMOVE = 'RECEIVE_ARTICLE_CATEGORY_REMOVE';

let requestList = (filter = {}) => {
    return (dispatch) => {
        return ArticleCategory.list(filter).then(json => {
            if (json.code === 0) {
                dispatch(receiveList(json.data));
            } else {
                dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveList = (data) => {
    return {
        type: RECEIVE_LIST,
        data: data.map(article_category => new ArticleCategory(article_category)),
    };
};
let setEditModalStatus = (visibility) => {
    return {
        type: SET_EDIT_MODAL_STATUS,
        data: visibility,
    };
};
let newObject = () => {
    return {
        type: NEW_OBJECT,
        data: {},
    };
};
let updateObject = (article_category) => {
    return {
        type: UPDATE_OBJECT,
        data: {
            id: article_category.id,
            name: article_category.name
        }
    };
};
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
    };
};
let receiveCreate = (data) => {
    return {
        type: RECEIVE_CREATE,
        data,
    };
};
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
    };
};
let receiveUpdate = (data) => {
    return {
        type: RECEIVE_UPDATE,
        data,
    };
};
let requestRemove = (id) => {
    return (dispatch) => {
        let article_category = new ArticleCategory({
            id: id
        });
        return article_category.remove().then(json => {
            if (json.code === 0) {
                dispatch(receiveRemove(id));
            } else {
                dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveRemove = (data) => {
    return {
        type: RECEIVE_REMOVE,
        data,
    };
};
export {
    requestList,
    setEditModalStatus,
    newObject,
    updateObject,
    requestCreate,
    requestUpdate,
    requestRemove
};