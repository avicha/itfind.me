import Article from 'models/article';
import {
    receiveError
} from './global';

export const RECEIVE_ARTICLE_LIST = 'RECEIVE_ARTICLE_LIST';
export const RECEIVE_ARTICLE_FETCH = 'RECEIVE_ARTICLE_FETCH';
export const RECEIVE_ARTICLE_CREATE = 'RECEIVE_ARTICLE_CREATE';
export const RECEIVE_ARTICLE_UPDATE = 'RECEIVE_ARTICLE_UPDATE';
export const RECEIVE_ARTICLE_REMOVE = 'RECEIVE_ARTICLE_REMOVE';

let requestArticleList = (filter = {}) => {
    return (dispatch) => {
        return Article.list(filter).then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleList(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveArticleList = (data) => {
    return {
        type: RECEIVE_ARTICLE_LIST,
        data: data.map(article => new Article(article)),
    };
};
let requestArticleFetch = (id) => {
    return (dispatch) => {
        let article = new Article({
            id: id
        });
        return article.fetch().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleFetch(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveArticleFetch = (data) => {
    return {
        type: RECEIVE_ARTICLE_FETCH,
        data,
    };
};
let requestArticleCreate = (data) => {
    return (dispatch) => {
        let article = new Article(data);
        return article.create().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleCreate(article));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveArticleCreate = (data) => {
    return {
        type: RECEIVE_ARTICLE_CREATE,
        data,
    };
};
let requestArticleUpdate = (id, data) => {
    return (dispatch) => {
        let article = new Article({
            id: id
        });
        return article.update(data).then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleUpdate(article));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveArticleUpdate = (data) => {
    return {
        type: RECEIVE_ARTICLE_UPDATE,
        data,
    };
};
let requestArticleRemove = (id) => {
    return (dispatch) => {
        let article = new Article({
            id: id
        });
        return article.remove().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleRemove(id));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveArticleRemove = (data) => {
    return {
        type: RECEIVE_ARTICLE_REMOVE,
        data,
    };
};
export {
    requestArticleList,
    requestArticleFetch,
    requestArticleCreate,
    requestArticleUpdate,
    requestArticleRemove,
};