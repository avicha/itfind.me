import ArticleCategory from 'models/article_category';
import {
    receiveError
} from './global';

export const RECEIVE_ARTICLE_CATEGORY_FETCH = 'RECEIVE_ARTICLE_CATEGORY_FETCH';
export const RESET_ARTICLE_CATEGORY = 'RESET_ARTICLE_CATEGORY';
let requestArticleCategoryFetch = (id) => {
    return (dispatch) => {
        let article_category = new ArticleCategory({
            id: id
        });
        return article_category.fetch().then(json => {
            if (json.code === 0) {
                return dispatch(receiveArticleCategoryFetch(article_category));
            } else {
                return dispatch(receiveError(json.msg));
            }
        });
    };
};
let receiveArticleCategoryFetch = (data) => {
    return {
        type: RECEIVE_ARTICLE_CATEGORY_FETCH,
        data,
    };
};
let resetArticleCategory = () => {
    return {
        type: RESET_ARTICLE_CATEGORY,
    }
}
export {
    requestArticleCategoryFetch,
    resetArticleCategory,
};