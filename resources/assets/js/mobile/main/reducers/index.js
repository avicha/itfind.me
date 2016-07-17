import {
    combineReducers
} from 'redux';
import {
    RECEIVE_ERROR
} from '../actions/global';
import {
    RECEIVE_BLOG_ARTICLE_LIST,
    RECEIVE_BLOG_FETCH,
    RECEIVE_BLOG_ARTICLE_CATEGORY_LIST
} from '../actions/blog';
import {
    RECEIVE_ARTICLE_CATEGORY_FETCH
} from '../actions/article_category';
import {
    RECEIVE_ARTICLE_FETCH
} from '../actions/article';

let blog_id = (state = '', action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_FETCH:
            return action.data.blog_id;
        default:
            return state;
    }
};
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
            return action.data.data
        default:
            return state;
    }
};
let article = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_FETCH:
            return action.data
        default:
            return state;
    }
};
let article_categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_BLOG_ARTICLE_CATEGORY_LIST:
            return action.data
        default:
            return state;
    }
}
let selected_article_category = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_CATEGORY_FETCH:
            return action.data
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
    blog_id,
    blog,
    articles,
    article,
    article_categories,
    selected_article_category,
    error,
});

export default app;