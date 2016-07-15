import React from 'react';
import {
    Link
} from 'react-router';

const BlogMenuNav = ({
    current_location,
    blog_id,
}) => (
    <footer>
        <ul className="nav">
            <li className={'nav-item' + (current_location == ('/blog/' + blog_id)? ' active':'')}><Link className="nav-link" to={'/blog/' + blog_id}>最新</Link></li>
            <li className={'nav-item' + (current_location == ('/blog/' + blog_id + '/category')? ' active':'')}><Link className="nav-link" to={'/blog/' + blog_id + '/category'}>分类</Link></li>
            <li className={'nav-item' + (current_location == ('/blog/'+ blog_id + '/about')? ' active':'')}><Link className="nav-link" to={'/blog/' + blog_id + '/about'}>我</Link></li>
        </ul>
    </footer>
);
export default BlogMenuNav;