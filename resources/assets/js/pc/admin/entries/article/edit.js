import React from 'react';
import ReactDom from 'react-dom';
import Menu from '../../components/menu';
import ArticleEditForm from '../../components/article/edit';
ReactDom.render(<Menu />,document.getElementById('left-panel'));
ReactDom.render(<ArticleEditForm />,document.getElementById('right-panel'));