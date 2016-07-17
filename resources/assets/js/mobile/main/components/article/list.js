import React, {
    Component
} from 'react';
import ArticleListTpl1 from './list_tpl1';
import {
    requestBlogArticleListFetch,
} from '../../actions/blog';
import {
    requestArticleCategoryFetch
} from '../../actions/article_category';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.article_category_id) {
            this.props.dispatch(requestArticleCategoryFetch(this.props.article_category_id));
        }
        let filter = {
            page: 1,
            order: '-created_at',
        };
        if (this.props.article_category_id) {
            filter.category_id = this.props.article_category_id;
        }
        this.props.dispatch(requestBlogArticleListFetch(this.props.blog_id, filter));
    }
    render() {
        return (
            <div className="articles">
                {
                    this.props.articles.map(article=>{
                        return <ArticleListTpl1 article={article} key={article.id} />
                    })
                }
            </div>
        );
    }
}