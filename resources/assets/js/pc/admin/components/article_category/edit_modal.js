import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom'
import visibility_types from '../../constants/visibility'
import $ from 'jquery'

class ArticleCategoryEditModal extends Component {
    componentDidMount() {
        this.dom = $(ReactDOM.findDOMNode(this));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.edit_modal_status === visibility_types.VISIBLE) {
            this.dom.modal('show');
        } else {
            this.dom.modal('hide');
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
                                        <input type="hidden" value=""/>
                                        <input type="text" className="form-control" id="name-input" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">确定</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default ArticleCategoryEditModal