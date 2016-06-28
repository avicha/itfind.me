import {
    combineReducers
} from 'redux'
import action_types from '../constants/actions'
import visibility_types from '../constants/visibility'

let article_categories = (state = [], action) => {
    switch (action.type) {
        case action_types.article_category.RECEIVE_LIST:
            return action.data;
        case action_types.article_category.RECEIVE_CREATE:
            return [...state, action.data];
        case action_types.article_category.RECEIVE_UPDATE:
            return state.map(article_category => {
                if (article_category.id == action.data.id) {
                    return action.data;
                } else {
                    return article_category;
                }
            });
        case action_types.article_category.RECEIVE_REMOVE:
            return state.filter(article_category => article_category.id != action.data.id);
        default:
            return state;
    }
}
let edit_modal_status = (state = visibility_types.HIDDEN, action) => {
    switch (action.type) {
        case action_types.article_category.SET_EDIT_MODAL_STATUS:
            return action.data;
        default:
            return state;
    }
}
let article_category = (state = {}, action) => {
    switch (action.type) {
        case action_types.article_category.NEW_OBJECT:
            return action.data;
        case action_types.article_category.UPDATE_OBJECT:
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