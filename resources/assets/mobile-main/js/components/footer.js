import React from 'react';
import {
    Link
} from 'react-router';

const Footer = ({
    current_location,
    blog_id,
}) => (
    <footer>
        <ul className="nav">
            <li className={'nav-item' + (current_location == ('/blog/' + blog_id + '/article')? ' active':'')}><Link className="nav-link" to={'/blog/' + blog_id + '/article'}>文章</Link></li>
            <li className={'nav-item' + (current_location == ('/blog/' + blog_id + '/article_category')? ' active':'')}><Link className="nav-link" to={'/blog/' + blog_id + '/article_category'}>分类</Link></li>
            <li className={'nav-item' + (current_location == ('/blog/'+ blog_id)? ' active':'')}><Link className="nav-link" to={'/blog/' + blog_id}>我</Link></li>
        </ul>
    </footer>
);
export default Footer;