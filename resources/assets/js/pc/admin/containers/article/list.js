import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Menu from '../../components/menu';
import ArticleListNav from '../../components/article/list_nav';
import ArticleListTable from '../../components/article/list_table';

const mapStateToProps = (state, ownProps) => state;
const ArticleListContainer = ({
    dispatch,
    articles,
}) => (
    <div className="row">
        <div className="col-md-3">
            <Menu />
        </div>
        <div className="col-md-9">
            <ArticleListNav />
            <ArticleListTable
                articles={articles}
                dispatch={dispatch}
            />
        </div>
    </div>
)
export default connect(mapStateToProps)(ArticleListContainer)
