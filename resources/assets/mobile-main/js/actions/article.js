import Article from 'models/article';
import {
    receiveError
} from './global';

export const RECEIVE_ARTICLE_FETCH = 'RECEIVE_ARTICLE_FETCH';
export const RESET_ARTICLE = 'RESET_ARTICLE';

let requestArticleFetch = (id) => {
    return (dispatch) => {
        let article = new Article({
            id: id
        });
        return article.fetch().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleFetch(json.data));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveArticleFetch = (data) => {
    return {
        type: RECEIVE_ARTICLE_FETCH,
        data,
    };
};
let resetArticle = () => {
    return {
        type: RESET_ARTICLE,
    }
}
export {
    requestArticleFetch,
    resetArticle,
};