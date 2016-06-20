import React, {
    Component
} from 'react';
export default class Menu extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div class="panel-heading" role="tab" id="article-manage-tab">
                      <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#article-manage" aria-expanded="true" aria-controls="article-manage">
                          文章管理
                        </a>
                      </h4>
                    </div>
                    <div id="article-manage" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="article-manage-tab">
                        <div class="panel-body">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="/article" aria-expanded="true" aria-controls="article-manage">
                          文章管理
                        </a>
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#article-manage" aria-expanded="true" aria-controls="article-manage">
                          文章管理
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}