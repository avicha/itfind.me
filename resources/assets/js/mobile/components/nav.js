import React, {
    Component
} from 'react';
class Nav extends Component {
    render() {
        return (
            <div className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                    <p className="navbar-text">管理后台</p>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="/" id="user-name">{this.props.userName}</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" id="logout">退出登录</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Nav;