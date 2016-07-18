import {
    combineReducers
} from 'redux';
import $ from 'jquery';
import {
    RECEIVE_BLOG_FETCH,
} from '../actions/blog';
import {
    RECEIVE_ERROR
} from '../actions/global';

let blog = (state = {
    id: $('meta[name="blog-id"]').attr('content')
}, action) => {
    switch (action.type) {
        case RECEIVE_BLOG_FETCH:
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
    blog,
    error,
});

export default app;