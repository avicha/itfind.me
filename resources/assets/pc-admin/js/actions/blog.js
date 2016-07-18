import Blog from 'models/blog';
import {
    receiveError
} from './global';

export const RECEIVE_BLOG_LIST = 'RECEIVE_BLOG_LIST';
export const RECEIVE_BLOG_FETCH = 'RECEIVE_BLOG_FETCH';
export const RECEIVE_BLOG_CREATE = 'RECEIVE_BLOG_CREATE';
export const RECEIVE_BLOG_UPDATE = 'RECEIVE_BLOG_UPDATE';
export const RECEIVE_BLOG_REMOVE = 'RECEIVE_BLOG_REMOVE';

let requestBlogList = (filter = {}) => {
    return (dispatch) => {
        return Blog.list(filter).then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogList(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveBlogList = (data) => {
    return {
        type: RECEIVE_BLOG_LIST,
        data: data.map(blog => new Blog(blog)),
    };
};
let requestBlogFetch = (id) => {
    return (dispatch) => {
        let blog = new Blog({
            id: id
        });
        return blog.fetch().then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogFetch(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveBlogFetch = (data) => {
    return {
        type: RECEIVE_BLOG_FETCH,
        data,
    };
};
let requestBlogCreate = (data) => {
    return (dispatch) => {
        let blog = new Blog(data);
        return blog.create().then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogCreate(blog));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveBlogCreate = (data) => {
    return {
        type: RECEIVE_BLOG_CREATE,
        data,
    };
};
let requestBlogUpdate = (id, data) => {
    return (dispatch) => {
        let blog = new Blog({
            id: id
        });
        return blog.update(data).then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogUpdate(blog));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveBlogUpdate = (data) => {
    return {
        type: RECEIVE_BLOG_UPDATE,
        data,
    };
};
let requestBlogRemove = (id) => {
    return (dispatch) => {
        let blog = new Blog({
            id: id
        });
        return blog.remove().then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogRemove(id));
            } else {
                return dispatch(receiveError(json.msg))
            }
        });
    };
};
let receiveBlogRemove = (data) => {
    return {
        type: RECEIVE_BLOG_REMOVE,
        data,
    };
};
export {
    requestBlogList,
    requestBlogFetch,
    requestBlogCreate,
    requestBlogUpdate,
    requestBlogRemove,
};