import React from 'react';
import {
    Link
} from 'react-router'

const BlogMenuNav = ({
    current_location,
    nick,
}) => (
    <footer>
        <ul className="nav">
            <li className={'nav-item' + (current_location == ('/' + nick)? ' active':'')}><Link className="nav-link" to="/">最新</Link></li>
            <li className={'nav-item' + (current_location == ('/' + nick + 'category')? ' active':'')}><Link className="nav-link" to="/category">分类</Link></li>
            <li className={'nav-item' + (current_location == ('/'+ nick + 'introduction')? ' active':'')}><Link className="nav-link" to="/introduction">我</Link></li>
        </ul>
    </footer>
);
export default BlogMenuNav;