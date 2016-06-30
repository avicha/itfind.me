import React from 'react';
import {
    connect,
    Provider,
} from 'react-redux';
import Menu from '../../components/menu';
import ArticleEditNav from '../../components/article/edit_nav';
import ArticleEditForm from '../../components/article/edit_form';


const mapStateToProps = (state, ownProps) => state;
const ArticleEditContainer = ({
    dispatch,
    article_categories,
}) => (
    <div className="row">
        <div className="col-md-3">
            <Menu />
        </div>
        <div className="col-md-9">
            <ArticleEditNav
                is_create_article={true} 
            />
            <ArticleEditForm
                article_categories={article_categories}
                dispatch={dispatch}
            />
        </div>
    </div>
)
export default connect(mapStateToProps)(ArticleEditContainer)