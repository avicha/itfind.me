import {
    combineReducers
} from 'redux'
import action_types from '../constants/actions'
import visibility_types from '../constants/visibility'

let article_categories = (state = [], action) => {
    switch (action.type) {
        case action_types.article_category.RECEIVE_LIST:
            return action.data;
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
const app = combineReducers({
    article_categories,
    edit_modal_status
})

export default app