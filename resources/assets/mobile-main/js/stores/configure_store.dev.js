import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
const enhancer = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);
if (module.hot) {
    module.hot.accept();
}
export default (reducer, initial_state = {}) => {
    return createStore(reducer, initial_state, enhancer);
};