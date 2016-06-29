import React from 'react';
import ReactDom from 'react-dom';
import Menu from '../components/menu';
ReactDom.render(
    <div className="row">
        <div className="col-md-3">
            <Menu />
        </div>
        <div className="col-md-9">
        </div>
    </div>
,document.getElementById('root'));