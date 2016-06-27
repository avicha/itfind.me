import {
    combineReducers
} from 'redux'
let url = (state, action) => window.location.pathname
let article_categories = (state = [], action) => {
    switch (action.type) {
        case 'receiveList':
            return action.data;
        default:
            return state;
    }
}
const article_category_list = combineReducers({
    url,
    article_categories
})

export default article_category_list