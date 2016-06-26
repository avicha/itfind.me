// import React, {
//     Component
// } from 'react';
// import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import Menu from '../../components/menu';
// import ArticleCategoryNav from '../../components/article_category/nav';
// import ArticleCategoryTable from '../../components/article_category/list';
// import ArticleCategoryEditModal from '../../components/article_category/edit_modal';

// class ArticleCategoryListContainer extends Component {
//     componentDidMount() {
//         this.article_category_edit_modal = $(ReactDOM.findDOMNode(this.refs.article_category_edit_modal));
//     }
//     onArticleCategoryCreateBtnClick() {
//         this.refs.article_category_edit_modal.refs.id.value = '';
//         this.refs.article_category_edit_modal.refs.name.value = '';
//         this.article_category_edit_modal.modal('show');
//     }
//     onArticleCategoryEditBtnClick(article_category) {
//         this.refs.article_category_edit_modal.refs.id.value = article_category.id;
//         this.refs.article_category_edit_modal.refs.name.value = article_category.name;
//         this.article_category_edit_modal.modal('show');
//     }
//     onArticleCategoryCreate(article_category) {
//         this.refs.article_category_table.createArticleCategory(article_category);
//         this.article_category_edit_modal.modal('hide');
//     }
//     onArticleCategoryUpdate(article_category) {
//         this.refs.article_category_table.updateArticleCategory(article_category);
//         this.article_category_edit_modal.modal('hide');
//     }
//     render() {
//         return (
//             <div className="row">
//                 <div id="left-panel" className="col-md-3">
//                     <Menu />
//                 </div>
//                 <div id="right-panel" className="col-md-9">
//                     <ArticleCategoryNav onArticleCategoryCreateBtnClick={this.onArticleCategoryCreateBtnClick.bind(this)} />
//                     <ArticleCategoryTable ref="article_category_table" onArticleCategoryEditBtnClick={this.onArticleCategoryEditBtnClick.bind(this)} />
//                     <ArticleCategoryEditModal ref="article_category_edit_modal" onArticleCategoryCreate={this.onArticleCategoryCreate.bind(this)} onArticleCategoryUpdate={this.onArticleCategoryUpdate.bind(this)}/>
//                 </div>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<ArticleCategoryListContainer />, document.getElementById('root'));
import {
    connect
} from 'react-redux'
import Table from '../../components/article_category/table'

const mapStateToProps = (state, ownProps) => ({
    article_categories: []
})

const mapDispatchToProps = (dispatch, ownProps) => ({})


const ArticleCategoryTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)

export default ArticleCategoryTable