import React, {
    Component
} from 'react';
import ArticleCategoryModel from 'models/article_category';
export default class ArticleCategoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article_categories: []
        };
    }
    componentDidMount() {
        let self = this;
        ArticleCategoryModel.list(({
            err,
            data
        }) => {
            if (err) {
                alert(err);
            } else {
                self.setState({
                    article_categories: data
                });
            }
        });
    }
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.article_categories.map((article_category)=>{
                        return <tr><td>{article_category.name}</td><td><a className="btn btn-info btn-xs edit"><span className="glyphicon glyphicon-edit"></span> 编辑</a></td></tr>
                    })}
                </tbody>
            </table>
        );
    }
}