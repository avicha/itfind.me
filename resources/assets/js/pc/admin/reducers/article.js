import {
    combineReducers
} from 'redux';
import {
    RECEIVE_LIST,
} from '../actions/article_category';

let article_categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_LIST:
            return action.data;
        default:
            return state;
    }
};

const app = combineReducers({
    article_categories,
});

export default app;