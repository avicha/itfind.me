import BaseModel from 'models/base';
class ArticleModel extends BaseModel {
    constructor(props) {
        super(props);
    }
}
ArticleModel.urlRoot = '/article';
export default ArticleModel