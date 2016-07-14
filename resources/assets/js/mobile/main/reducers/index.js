import {
    combineReducers
} from 'redux';
import {
    RECEIVE_ERROR
} from '../actions/global';
import {
    RECEIVE_BLOG_NEWEST_ARTICLES_FETCH
} from '../actions/blog';

let blog_id = (state = document.querySelector('meta[name="blog-id"]').getAttribute('content'), action) => {
    return state;
};
let newest_articles = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_BLOG_NEWEST_ARTICLES_FETCH:
            return action.data.data
        default:
            return state;
    }
}
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
    newest_articles,
    error,
});

export default app;