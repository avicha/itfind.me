import {
    combineReducers
} from 'redux';
import {
    RECEIVE_ERROR
} from '../actions/global';
import {
    RECEIVE_BLOG_ARTICLE_LIST,
    RECEIVE_BLOG_FETCH,
    RECEIVE_BLOG_ARTICLE_CATEGORY_LIST,
    RESET_BLOG_ARTICLE_LIST,
} from '../actions/blog';
import {
    RECEIVE_ARTICLE_CATEGORY_FETCH,
    RESET_ARTICLE_CATEGORY,
} from '../actions/article_category';
import {
    RECEIVE_ARTICLE_FETCH,
    RESET_ARTICLE,
} from '../actions/article';

let blog = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_BLOG_FETCH:
            return action.data;
        default:
            return state;
    }
};
let articles = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_BLOG_ARTICLE_LIST:
            return action.data.data;
        case RESET_BLOG_ARTICLE_LIST:
            return [];
        default:
            return state;
    }
};
let article = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_FETCH:
            return action.data;
        case RESET_ARTICLE:
            return {};
        default:
            return state;
    }
};
let article_categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_BLOG_ARTICLE_CATEGORY_LIST:
            return action.data;
        default:
            return state;
    }
}
let article_category = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_CATEGORY_FETCH:
            return action.data;
        case RESET_ARTICLE_CATEGORY:
            return {};
        default:
            return state;
    }
};
let error = (state = '', action) => {
    switch (action.type) {
        case RECEIVE_ERROR:
            return action.data;
        default:
            return state;
    }
};
const app = combineReducers({
    blog,
    articles,
    article,
    article_categories,
    article_category,
    error,
});

export default app;