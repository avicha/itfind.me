import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router';
import {
    requestBlogArticleCategoryListFetch,
} from '../../actions/blog';

const ArticleCategoryListTpl1 = ({
    blog_id,
    article_category,
}) => (
    <li className="article-category">
        <Link to={'/blog/' + blog_id + '/article_category/' + article_category.id}>{article_category.name}</Link>
    </li>
)
export default class ArticleCategoryList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(requestBlogArticleCategoryListFetch(this.props.blog_id));
    }
    render() {
        let {
            blog_id,
            article_categories
        } = this.props;
        return (
            <ul className="article-categories">
                {
                    this.props.article_categories.map(article_category=>{
                        return <ArticleCategoryListTpl1 blog_id={blog_id} article_category={article_category} key={article_category.id} />
                    })
                }
            </ul>
        );
    }
}