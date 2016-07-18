import Blog from 'models/blog';
import {
    receiveError
} from './global';

export const RECEIVE_BLOG_FETCH = 'RECEIVE_BLOG_FETCH';
export const RECEIVE_BLOG_ARTICLE_CATEGORY_LIST = 'RECEIVE_BLOG_ARTICLE_CATEGORY_LIST';
export const RECEIVE_BLOG_ARTICLE_LIST = 'RECEIVE_BLOG_ARTICLE_LIST';
export const RESET_BLOG_ARTICLE_LIST = 'RESET_BLOG_ARTICLE_LIST';

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
let receiveBlogArticleList = (data) => {
    return {
        type: RECEIVE_BLOG_ARTICLE_LIST,
        data,
    };
};
let requestBlogArticleListFetch = (id, opts) => {
    return (dispatch) => {
        let blog = new Blog({
            id: id
        });
        return blog.fetchArticles(opts).then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogArticleList(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        }).catch(e => {
            return dispatch(receiveError(e));
        });
    }
};
let receiveBlogArticleCategoryList = (data) => {
    return {
        type: RECEIVE_BLOG_ARTICLE_CATEGORY_LIST,
        data,
    };
};
let requestBlogArticleCategoryListFetch = (id) => {
    return (dispatch) => {
        let blog = new Blog({
            id: id
        });
        return blog.fetchArticleCategories().then(json => {
            if (json.code === 0) {
                return dispatch(receiveBlogArticleCategoryList(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        }).catch(e => {
            return dispatch(receiveError(e));
        });
    }
}
let resetBlogArticleList = () => {
    return {
        type: RESET_BLOG_ARTICLE_LIST,
    };
}
export {
    requestBlogFetch,
    requestBlogArticleListFetch,
    requestBlogArticleCategoryListFetch,
    resetBlogArticleList,
};