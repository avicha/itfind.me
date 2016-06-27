import {
    combineReducers
} from 'redux'

let article_categories = (state = [], action) => {
    switch (action.type) {
        case 'receiveList':
            return action.data;
        default:
            return state;
    }
}
const app = combineReducers({
    article_categories
})

export default app