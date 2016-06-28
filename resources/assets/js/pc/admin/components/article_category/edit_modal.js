import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import visibility_types from '../../constants/visibility';
import $ from 'jquery'

class ArticleCategoryEditModal extends Component {
    componentDidMount() {
        let {
            setEditModalStatus
        } = this.props;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.on('hidden.bs.modal', () => {
            setEditModalStatus(visibility_types.HIDDEN);
        });
    }
    componentWillReceiveProps(nextProps) {
        let {
            article_category,
            edit_modal_status,
        } = nextProps;
        if (edit_modal_status === visibility_types.VISIBLE) {
            this.dom.modal('show');
            this.refs.id.value = article_category.id || null;
            this.refs.name.value = article_category.name || null;
        } else {
            this.dom.modal('hide');
        }
    }
    saveBtnClick() {
        let {
            requestUpdate,
            requestCreate
        } = this.props;
        let article_category = {
            id: this.refs.id.value,
            name: this.refs.name.value
        };
        if (article_category.id) {
            requestUpdate(article_category);
        } else {
            requestCreate(article_category);
        }
    }
    render() {
        return <div className="modal fade">
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
                                        <input type="hidden" ref="id"/>
                                        <input type="text" className="form-control" id="name-input" ref="name"/>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.saveBtnClick.bind(this)}>确定</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default ArticleCategoryEditModal