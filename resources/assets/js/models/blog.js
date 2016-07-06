import BaseModel from 'models/base';
class BlogModel extends BaseModel {
    constructor(props) {
        super(props);
        this.urlRoot = '/blog';
    }
}
BlogModel.urlRoot = '/blog';
export default BlogModel