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
        return (
            <div className="panel article">
                <h2 className="title">{article.title || ''}</h2>
                <p className="meta">
                    <span className="category">分类：{article.category && article.category.name}</span>
                    <span className="created_at">发布时间：{article.created_at}</span>
                </p>
                <div className="content" dangerouslySetInnerHTML={{__html: article.content}}></div>
            </div>
        );
    }
}
export default ArticleDetailPanel;