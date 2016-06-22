import React, {
    Component
} from 'react';
export default class ArticleCategoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article_categories: []
        };
    }
    componentDidMount() {
        this.setState({
            article_categories: [{
                id: 1,
                name: '测试'
            }]
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