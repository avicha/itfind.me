import Article from 'models/article';
import {
    receiveError
} from './global';

export const RECEIVE_LIST = 'RECEIVE_ARTICLE_LIST';
export const RECEIVE_FETCH = 'RECEIVE_ARTICLE_FETCH';
export const RECEIVE_CREATE = 'RECEIVE_ARTICLE_CREATE';
export const RECEIVE_UPDATE = 'RECEIVE_ARTICLE_UPDATE';
export const RECEIVE_REMOVE = 'RECEIVE_ARTICLE_REMOVE';

let requestList = (filter = {}) => {
    return (dispatch) => {
        return Article.list(filter).then(json => {
            if (json.code === 0) {
                return dispatch(receiveList(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveList = (data) => {
    return {
        type: RECEIVE_LIST,
        data: data.map(article => new Article(article)),
    };
};
let requestFetch = (id) => {
    return (dispatch) => {
        let article = new Article({
            id: id
        });
        return article.fetch().then(json => {
            if (json.code === 0) {
                return dispatch(receiveFetch(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveFetch = (data) => {
    return {
        type: RECEIVE_FETCH,
        data,
    };
};
let requestCreate = (data) => {
    return (dispatch) => {
        let article = new Article(data);
        return article.create().then(json => {
            if (json.code === 0) {
                return dispatch(receiveCreate(article));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveCreate = (data) => {
    return {
        type: RECEIVE_CREATE,
        data,
    };
};
let requestUpdate = (id, data) => {
    return (dispatch) => {
        let article = new Article({
            id: id
        });
        return article.update(data).then(json => {
            if (json.code === 0) {
                return dispatch(receiveUpdate(article));
            } else {
                return dispatch(receiveError(json.msg))
            }
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
        let article = new Article({
            id: id
        });
        return article.remove().then(json => {
            if (json.code === 0) {
                return dispatch(receiveRemove(id));
            } else {
                return dispatch(receiveError(json.msg))
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
    requestFetch,
    requestCreate,
    requestUpdate,
    requestRemove
};