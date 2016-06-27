import BaseModel from 'models/base';
class ArticleCategoryModel extends BaseModel {
    constructor(props) {
        super(props);
        this.urlRoot = '/article_category';
    }
}
ArticleCategoryModel.urlRoot = '/article_category';
export default ArticleCategoryModel