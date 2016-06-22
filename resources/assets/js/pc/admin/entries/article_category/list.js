import React from 'react';
import ReactDom from 'react-dom';
import Menu from '../../components/menu';
import ArticleCategoryNav from '../../components/article_category/nav';
import ArticleCategoryTable from '../../components/article_category/list';

ReactDom.render(<Menu />, document.getElementById('left-panel'));
ReactDom.render(<div><ArticleCategoryNav /><ArticleCategoryTable /></div>, document.getElementById('right-panel'));