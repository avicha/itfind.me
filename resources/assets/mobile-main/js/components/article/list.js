import React, {
    Component
} from 'react';
import ArticleListTpl1 from './list_tpl1';
import {
    requestBlogArticleListFetch,
    resetBlogArticleList,
} from '../../actions/blog';
import {
    requestArticleCategoryFetch,
    resetArticleCategory,
} from '../../actions/article_category';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.category_id) {
            this.props.dispatch(requestArticleCategoryFetch(this.props.category_id));
        }
        let filter = {
            page: 1,
            order: '-created_at',
        };
        if (this.props.category_id) {
            filter.category_id = this.props.category_id;
        }
        this.props.dispatch(requestBlogArticleListFetch(this.props.blog_id, filter));
    }
    componentWillUnmount() {
        this.props.dispatch(resetArticleCategory());
        this.props.dispatch(resetBlogArticleList());
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