import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Menu from '../../components/menu';
import ArticleCategoryNav from '../../components/article_category/nav';
import ArticleCategoryTable from '../../components/article_category/list';
import ArticleCategoryEditModal from '../../components/article_category/edit_modal';

class ArticleCategoryListContainer extends Component {
    componentDidMount() {
        this.article_category_edit_modal = $(ReactDOM.findDOMNode(this.refs.article_category_edit_modal));
    }
    onArticleCategoryCreateBtnClick() {
        this.article_category_edit_modal.modal('show');
    }
    onArticleCategoryCreate(article_category) {
        this.refs.article_category_table.createArticleCategory(article_category);
        this.article_category_edit_modal.modal('hide');
    }
    render() {
        return (
            <div className="row">
                <div id="left-panel" className="col-md-3">
                    <Menu />
                </div>
                <div id="right-panel" className="col-md-9">
                    <ArticleCategoryNav onArticleCategoryCreateBtnClick={this.onArticleCategoryCreateBtnClick.bind(this)} />
                    <ArticleCategoryTable ref="article_category_table" />
                    <ArticleCategoryEditModal ref="article_category_edit_modal" onArticleCategoryCreate={this.onArticleCategoryCreate.bind(this)} />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<ArticleCategoryListContainer />, document.getElementById('root'));