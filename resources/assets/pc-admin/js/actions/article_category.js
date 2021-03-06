import ArticleCategory from 'models/article_category';
import {
    receiveError
} from './global';

export const RECEIVE_ARTICLE_CATEGORY_LIST = 'RECEIVE_ARTICLE_CATEGORY_LIST';
export const RECEIVE_ARTICLE_CATEGORY_CREATE = 'RECEIVE_ARTICLE_CATEGORY_CREATE';
export const RECEIVE_ARTICLE_CATEGORY_UPDATE = 'RECEIVE_ARTICLE_CATEGORY_UPDATE';
export const SET_ARTICLE_CATEGORY_EDIT_MODAL_STATUS = 'SET_ARTICLE_CATEGORY_EDIT_MODAL_STATUS';
export const NEW_ARTICLE_CATEGORY_OBJECT = 'NEW_ARTICLE_CATEGORY_OBJECT';
export const UPDATE_ARTICLE_CATEGORY_OBJECT = 'UPDATE_ARTICLE_CATEGORY_OBJECT';
export const RECEIVE_ARTICLE_CATEGORY_REMOVE = 'RECEIVE_ARTICLE_CATEGORY_REMOVE';

let requestArticleCategoryList = (filter = {}) => {
    return (dispatch) => {
        return ArticleCategory.list(filter).then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleCategoryList(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveArticleCategoryList = (data) => {
    return {
        type: RECEIVE_ARTICLE_CATEGORY_LIST,
        data: data.map(article_category => new ArticleCategory(article_category)),
    };
};
let setArticleCategoryEditModalStatus = (visibility) => {
    return {
        type: SET_ARTICLE_CATEGORY_EDIT_MODAL_STATUS,
        data: visibility,
    };
};
let newArticleCategoryObject = () => {
    return {
        type: NEW_ARTICLE_CATEGORY_OBJECT,
        data: {},
    };
};
let updateArticleCategoryObject = (article_category) => {
    return {
        type: UPDATE_ARTICLE_CATEGORY_OBJECT,
        data: {
            id: article_category.id,
            name: article_category.name
        }
    };
};
let requestArticleCategoryCreate = (data) => {
    return (dispatch) => {
        let article_category = new ArticleCategory(data);
        return article_category.create().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleCategoryCreate(article_category));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveArticleCategoryCreate = (data) => {
    return {
        type: RECEIVE_ARTICLE_CATEGORY_CREATE,
        data,
    };
};
let requestArticleCategoryUpdate = (data) => {
    return (dispatch) => {
        let article_category = new ArticleCategory(data);
        return article_category.update().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleCategoryUpdate(article_category));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveArticleCategoryUpdate = (data) => {
    return {
        type: RECEIVE_ARTICLE_CATEGORY_UPDATE,
        data,
    };
};
let requestArticleCategoryRemove = (id) => {
    return (dispatch) => {
        let article_category = new ArticleCategory({
            id: id
        });
        return article_category.remove().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleCategoryRemove(id));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveArticleCategoryRemove = (data) => {
    return {
        type: RECEIVE_ARTICLE_CATEGORY_REMOVE,
        data,
    };
};
export {
    requestArticleCategoryList,
    setArticleCategoryEditModalStatus,
    newArticleCategoryObject,
    updateArticleCategoryObject,
    requestArticleCategoryCreate,
    requestArticleCategoryUpdate,
    requestArticleCategoryRemove
};