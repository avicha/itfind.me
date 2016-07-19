@extends('pc-main.app')

@section('title', $blog->title)

@section('meta')
    @parent
    @section('meta_description', $blog->intro)
    @section('meta_keywords', 'blog,博客,itfind.me')
    @section('meta_author', 'avicha, avichabc@gmail.com')
@endsection

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/pc-main/css/blog/index.css">
@endsection

@section('body')
<div id="header">
    <div class="container">
        <a href="/blog/{{ $blog->id }}" class="title">{{ $blog->title }}</a>
        <form class="search-form" action="/blog/{{ $blog->id }}/article">
            <input type="text" name="kw" class="search-input" placeholder="请输入搜索文章的关键字" />
            <em class="btn search-btn"></em>
        </form>
    </div>
</div>
<div id="content">
    <div id="left-panel">
        <div class="blog-info-container">
            <img class="avatar" src="{{ $blog->user->avatar ?: config('app.static_url_prefix').'/img/default_avatar.jpg' }}">
            <div class="user-info">
                <p>
                    <span class="label">昵称：</span>
                    <span class="value">{{ $blog->user->nick }}</span>
                </p>
                <p>
                    <span class="label">简介：</span>
                    <span class="value">{{ $blog->intro ?: '这个博主很懒，什么简介都没有。' }}</span>
                </p>
            </div>
            <div class="blog-info">
                <p>
                    <span class="label">文章数：</span>
                    <span class="value">{{ $blog->articles_count }}</span>
                </p>
                <p>
                    <span class="label">浏览量：</span>
                    <span class="value">{{ $blog->views_count }}</span>
                </p>
            </div>
        </div>
        <div class="article-categories-container">
            <h3 class="article-categories-text">文章分类</h3>
            <ul class="article-categories">
                @foreach ($blog->article_categories as $article_category)
                <li class="article-category">
                    <a href="/blog/{{ $blog->id }}/article_category/{{ $article_category->id }}">{{ $article_category->name }}
                    </a>
                </li>
                @endforeach
            </ul>
        </div>
        <div class="hot-articles-container">
            <h3 class="hot-articles-text">热门文章</h3>
            <ul class="hot-articles">
                @each('pc-main.article.list_tpl2', $hot_articles, 'article')
            </ul>
        </div>
    </div>
    <div id="right-panel">
        @if(isset($category))
        <div class="search-result-tips">搜索到了{{ $articles->total() }}篇分类为“{{ $category->name }}”的文章</div>
        @endif
        @if(isset($kw))
        <div class="search-result-tips">搜索到了{{ $articles->total() }}篇关键字为“{{ $kw }}”的文章</div>
        @endif
        <div class="articles">
        @each('pc-main.article.list_tpl1', $articles, 'article')
        </div>
        {{ $articles->links() }}
    </div>
</div>
@endsection

@section('javascript')
@endsection