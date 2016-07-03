import {
    combineReducers
} from 'redux';
import {
    RECEIVE_ARTICLE_CATEGORY_LIST,
} from '../actions/article_category';
import {
    RECEIVE_ARTICLE_LIST,
    RECEIVE_ARTICLE_FETCH,
    RECEIVE_ARTICLE_CREATE,
    RECEIVE_ARTICLE_UPDATE,
    RECEIVE_ARTICLE_REMOVE,
} from '../actions/article';
import {
    RECEIVE_ERROR
} from '../actions/global';

let article_categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_CATEGORY_LIST:
            return action.data;
        default:
            return state;
    }
};
let articles = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_LIST:
            return action.data;
        case RECEIVE_ARTICLE_REMOVE:
            return state.filter(article => article.id != action.data);
        default:
            return state;
    }
};
let article = (state = {
    id: /^\/article\/(\d+)$/.test(window.location.pathname) ? window.location.pathname.match(/^\/article\/(\d+)$/)[1] : ''
}, action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_FETCH:
            return action.data;
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
}
const app = combineReducers({
    article_categories,
    articles,
    article,
    error,
});

export default app;