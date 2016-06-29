import {
    combineReducers
} from 'redux'
import {
    RECEIVE_LIST,
    RECEIVE_CREATE,
    RECEIVE_UPDATE,
    RECEIVE_REMOVE,
    SET_EDIT_MODAL_STATUS,
    NEW_OBJECT,
    UPDATE_OBJECT
} from '../actions/article_category'
import visibility_types from '../constants/visibility'

let article_categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_LIST:
            return action.data;
        case RECEIVE_CREATE:
            return [...state, action.data];
        case RECEIVE_UPDATE:
            return state.map(article_category => {
                if (article_category.id == action.data.id) {
                    return action.data;
                } else {
                    return article_category;
                }
            });
        case RECEIVE_REMOVE:
            return state.filter(article_category => article_category.id != action.data);
        default:
            return state;
    }
}
let edit_modal_status = (state = visibility_types.HIDDEN, action) => {
    switch (action.type) {
        case SET_EDIT_MODAL_STATUS:
            return action.data;
        default:
            return state;
    }
}
let article_category = (state = {}, action) => {
    switch (action.type) {
        case NEW_OBJECT:
            return action.data;
        case UPDATE_OBJECT:
            return action.data;
        default:
            return state;
    }
}
const app = combineReducers({
    article_categories,
    edit_modal_status,
    article_category,
})

export default app