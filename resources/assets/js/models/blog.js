import BaseModel from 'models/base';
class BlogModel extends BaseModel {
    constructor(props) {
        super(props);
        this.urlRoot = '/blog';
    }
    fetchArticles(opts = {}) {
        let filter = {
            page: opts.page || 1,
            order: opts.order
        }
        return fetch(this.urlRoot + '/' + this.id + '/article', {
            method: 'get',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
            body: filter,
            credentials: 'include',
        }).then(res => res.json());
    }
}
BlogModel.urlRoot = '/blog';
export default BlogModel