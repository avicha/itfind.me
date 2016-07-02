import BaseModel from 'models/base';
class ArticleModel extends BaseModel {
    constructor(props) {
        super(props);
        this.urlRoot = '/article';
    }
}
ArticleModel.urlRoot = '/article';
export default ArticleModel