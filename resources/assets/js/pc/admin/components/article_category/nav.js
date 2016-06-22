import React, {
    Component
} from 'react';
export default class ArticleCategoryNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <p className="navbar-text navbar-left">分类列表</p>
                        <button className="btn btn-primary navbar-btn navbar-right">添加分类</button>
                    </div>
                </div>
            </nav>
        );
    }
}