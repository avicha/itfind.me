import BaseModel from 'models/base';
class ArticleCategoryModel extends BaseModel {
    constructor(props) {
        super(props);
    }
}
ArticleCategoryModel.urlRoot = '/article_category';
export default ArticleCategoryModel