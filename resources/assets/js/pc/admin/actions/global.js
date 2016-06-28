import action_types from '../constants/actions';
let receiveError = (error) => {
    return {
        type: action_types.RECEIVE_ERROR,
        data: error
    }
}
export {
    receiveError
}