import {
    combineReducers
} from 'redux';
import {
    RECEIVE_ERROR
} from '../actions/global';
let blog_id = (state = document.querySelector('meta[name="blog-id"]').getAttribute('content'), action) => {
    return state;
};
let newest_articles = (state = [], action) => {
    switch (action.type) {
        default: return state;
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