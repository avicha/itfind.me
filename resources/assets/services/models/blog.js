import BaseModel from 'models/base';
class BlogModel extends BaseModel {
    constructor(props) {
        super(props);
        this.urlRoot = '/blog';
    }
    fetchArticles(filter = {}) {
        let url = this.urlRoot + '/' + this.id + '/article';
        let qs = [];
        Object.keys(filter).forEach(key => qs.push(key + '=' + filter[key]));
        return fetch(url + '?' + qs.join('&'), {
            method: 'get',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include',
        }).then(res => res.json());
    }
    fetchArticleCategories(filter = {}) {
        return fetch(this.urlRoot + '/' + this.id + '/article_category', {
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