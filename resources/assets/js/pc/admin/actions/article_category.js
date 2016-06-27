import ArticleCategory from 'models/article_category'
let requestList = (filter = {}) => {
    return (dispatch) => {
        return ArticleCategory.list(filter).then(json => {
            if (json.code === 0) {
                dispatch(receiveList(null, json.data))
            } else {
                dispatch(receiveList(json.msg))
            }
        });
    }
}
let receiveList = (error, data) => {
    return {
        type: 'receiveList',
        data,
        error: error
    }
}
export {
    requestList,
    receiveList
}