import React, {
    Component
} from 'react';
import ArticleCategoryModel from 'models/article_category';
export default class ArticleCategoryEditModal extends Component {
    handleArticleCategoryCreate() {
        let name = this.refs.name.value;
        let article_category = new ArticleCategoryModel({
            name: name
        });
        article_category.create().done(res => {
            this.props.onArticleCategoryCreate(article_category);
        });
    }
    render() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">编辑文章分类</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal" role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label" htmlFor="name-input">名称</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="name-input" ref="name"/>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.handleArticleCategoryCreate.bind(this)}>确定</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}