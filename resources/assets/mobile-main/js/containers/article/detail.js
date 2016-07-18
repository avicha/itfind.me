import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Header from '../../components/header';
import ArticleDetailPanel from '../../components/article/detail_panel';

const mapStateToProps = (state, ownProps) => {
    return {
        article: state.article,
    };
};
const ArticleDetailContainer = ({
    params,
    article,
    dispatch,
}) => (
    <div className="page" id="page-article-detail">
        <Header has_back={true} title="文章详情" />
        <ArticleDetailPanel article={article} dispatch={dispatch} article_id={params.article_id} />
    </div>
);
export default connect(mapStateToProps)(ArticleDetailContainer)