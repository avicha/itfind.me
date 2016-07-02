import {
    combineReducers
} from 'redux';
import {
    RECEIVE_LIST as RECEIVE_ARTICLE_CATEGORY_LIST,
} from '../actions/article_category';
import {
    RECEIVE_LIST,
    RECEIVE_FETCH,
    RECEIVE_CREATE,
    RECEIVE_UPDATE,
    RECEIVE_REMOVE,
} from '../actions/article';

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
        case RECEIVE_LIST:
            return action.data;
        case RECEIVE_REMOVE:
            return state.filter(article => article.id != action.data);
        default:
            return state;
    }
}

const app = combineReducers({
    article_categories,
    articles,
});

export default app;