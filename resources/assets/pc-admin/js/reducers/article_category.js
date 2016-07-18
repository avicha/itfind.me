import {
    combineReducers
} from 'redux';
import {
    RECEIVE_ARTICLE_CATEGORY_LIST,
    RECEIVE_ARTICLE_CATEGORY_CREATE,
    RECEIVE_ARTICLE_CATEGORY_UPDATE,
    RECEIVE_ARTICLE_CATEGORY_REMOVE,
    SET_ARTICLE_CATEGORY_EDIT_MODAL_STATUS,
    NEW_ARTICLE_CATEGORY_OBJECT,
    UPDATE_ARTICLE_CATEGORY_OBJECT
} from '../actions/article_category';
import {
    RECEIVE_ERROR
} from '../actions/global';
import visibility_types from '../constants/visibility';

let article_categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ARTICLE_CATEGORY_LIST:
            return action.data;
        case RECEIVE_ARTICLE_CATEGORY_CREATE:
            return [...state, action.data];
        case RECEIVE_ARTICLE_CATEGORY_UPDATE:
            return state.map(article_category => {
                if (article_category.id == action.data.id) {
                    return action.data;
                } else {
                    return article_category;
                }
            });
        case RECEIVE_ARTICLE_CATEGORY_REMOVE:
            return state.filter(article_category => article_category.id != action.data);
        default:
            return state;
    }
};
let edit_modal_status = (state = visibility_types.HIDDEN, action) => {
    switch (action.type) {
        case SET_ARTICLE_CATEGORY_EDIT_MODAL_STATUS:
            return action.data;
        default:
            return state;
    }
};
let article_category = (state = {}, action) => {
    switch (action.type) {
        case NEW_ARTICLE_CATEGORY_OBJECT:
            return action.data;
        case UPDATE_ARTICLE_CATEGORY_OBJECT:
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
    edit_modal_status,
    article_category,
    error,
});

export default app;