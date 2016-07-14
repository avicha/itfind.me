import React, {
    Component
} from 'react';
import ArticleListTpl1 from './list_tpl1';
import {
    requestNewestArticlesFetch,
} from '../../actions/blog';


export default class NewestArticleList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(requestNewestArticlesFetch(this.props.blog_id));
    }
    render() {
        return (
            <div className="articles">
                {
                    this.props.newest_articles.map(article=>{
                        return <ArticleListTpl1 article={article} key={article.id} />
                    })
                }
            </div>
        );
    }
}