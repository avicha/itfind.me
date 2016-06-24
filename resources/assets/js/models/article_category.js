import $ from 'jquery';
import BaseModel from 'models/base';
export default class ArticleCategoryModel extends BaseModel {
    constructor(props) {
        super(props);
        this.urlRoot = '/article_category';
    }

}