import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
const enhancer = applyMiddleware(thunk);

export default (reducer, initial_state = {}) => {
    return createStore(reducer, initial_state, enhancer);
}