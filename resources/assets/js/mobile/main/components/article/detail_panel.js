import React, {
    Component
} from 'react';
import {
    requestArticleFetch,
} from '../../actions/article';


export default class ArticleDetailPanel extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(requestArticleFetch(this.props.article_id));
    }
    render() {
        let {
            article
        } = this.props;
        return (
            <div className="article">
                <h3 className="title">{article.is_top ? '【置顶】' : '' }{article.title || '' }</h3>
                <div className="meta">
                    <span className="created_at">{article.created_at&&article.created_at.slice(0,10)}</span>
                    <span className="author">{article.author}</span>
                </div>
                <div className="article-content" dangerouslySetInnerHTML={{__html:article.content}}></div>
                <div className="meta">
                    <span className="views-count">
                        阅读数 {article.views_count||0}
                    </span>
                    <span className="likes-count-container">
                        <em className="icon"></em>
                        <span className="likes-count">{article.likes_count||0}</span>
                    </span>
                </div>
            </div>
        );
    }
}