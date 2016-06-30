export const RECEIVE_ERROR = 'RECEIVE_ERROR';
let receiveError = (error) => {
    return {
        type: RECEIVE_ERROR,
        data: error
    }
};
export {
    receiveError
};