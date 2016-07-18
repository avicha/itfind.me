import React, {
    Component
} from 'react';
import {
    requestArticleFetch,
} from '../../actions/article';

class ArticleDetailPanel extends Component {
    componentDidMount() {
        this.props.dispatch(requestArticleFetch(this.props.article.id));
    }
    render() {
        let {
            article
        } = this.props;
        let tags = (article.tags || '').split(',').map(tag => {
            return '<a class="tag" href="#">' + tag + '</a>';
        }).join('');
        return (
            <div className="panel article">
                <h3 className="title">{article.is_top? '【置顶】':''}{article.title || ''}</h3>
                <div className="meta">
                    <span className="author">作者：{article.author}</span>
                    <span className="created_at">发布时间：{article.created_at}</span>
                    <div className="tags" dangerouslySetInnerHTML={{__html: '标签：' + tags}}></div>
                    <div className="category">
                        分类：
                        <a className="category-link" href="#">{article.category&&article.category.name}
                        </a>
                    </div>
                </div>
                <div className="article-content" dangerouslySetInnerHTML={{__html: article.content}}></div>
            </div>
        );
    }
}
export default ArticleDetailPanel;