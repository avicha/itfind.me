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
            return '<span class="label label-info">' + tag + '</span>';
        }).join(' ');
        return (
            <div className="panel article">
                <h2 className="title">{article.is_top? '【置顶】':''}{article.title || ''}</h2>
                <p className="meta">
                    <span className="category">分类：{article.category && article.category.name}</span>
                    <span className="created_at">发布时间：{article.created_at}</span>
                </p>
                <div className="content" dangerouslySetInnerHTML={{__html: article.content}}></div>
                <div className="tags" dangerouslySetInnerHTML={{__html: '标签：'+tags}}></div>
            </div>
        );
    }
}
export default ArticleDetailPanel;