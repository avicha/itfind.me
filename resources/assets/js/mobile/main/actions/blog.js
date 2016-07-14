import Blog from 'models/blog';
import {
    receiveError
} from './global';

export const RECEIVE_BLOG_FETCH = 'RECEIVE_BLOG_FETCH';
export const RECEIVE_BLOG_NEWEST_ARTICLES_FETCH = 'RECEIVE_BLOG_NEWEST_ARTICLES_FETCH';

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
let receiveBlogNewestArticlesFetch = (data) => {
    return {
        type: RECEIVE_BLOG_NEWEST_ARTICLES_FETCH,
        data,
    };
};
let requestNewestArticlesFetch = (id, page) => {
    return (dispatch) => {
        let blog = new Blog({
            id: id
        });
        return blog.fetchArticles({
            page: page,
            order: '-created_at'
        }).then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogNewestArticlesFetch(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        }).catch(e => {
            return dispatch(receiveError(e));
        });
    }
}
export {
    requestNewestArticlesFetch,
};