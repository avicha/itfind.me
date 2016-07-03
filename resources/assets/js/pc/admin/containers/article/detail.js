import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Menu from '../../components/menu';
import ArticleDetailNav from '../../components/article/detail_nav';
import ArticleDetailPanel from '../../components/article/detail_panel';

const mapStateToProps = (state, ownProps) => {
    return {
        article: state.article
    };
};
const ArticleListContainer = ({
    dispatch,
    article,
}) => (
    <div className="row">
        <div className="col-md-3">
            <Menu />
        </div>
        <div className="col-md-9">
            <ArticleDetailNav
                article={article}
            />
            <ArticleDetailPanel
                article={article}
                dispatch={dispatch}
            />
        </div>
    </div>
)
export default connect(mapStateToProps)(ArticleListContainer)