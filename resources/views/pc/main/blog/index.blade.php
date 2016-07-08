@extends('pc.app')

@section('title', $blog->title)

@section('meta')
    @parent
    @section('meta_description', $blog->intro)
    @section('meta_keywords', 'blog,博客,itfind.me')
    @section('meta_author', 'avicha, avichabc@gmail.com')
@endsection

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/pc/main/blog/index.css">
@endsection

@section('body')
<div id="header">
    <div class="container">
        <a href="/{{ $blog->user->nick }}" class="title">{{ $blog->title }}</a>
        <div class="search-form">
            <input type="text" name="kw" class="search-input" placeholder="请输入搜索文章的关键字" />
            <em class="btn search-btn"></em>
        </div>
    </div>
</div>
<div id="content">
    <div id="left-panel">
        <div class="blog-info-container">
            <img class="avatar" src="{{ $blog->
            user->avatar ?: config('app.static_url_prefix').'/img/pc/default_avatar.jpg' }}">
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
                    <a href="/{{ $blog->
                        user->nick }}/category/{{ $article_category->id }}">{{ $article_category->name }}
                    </a>
                </li>
                @endforeach
            </ul>
        </div>
        <div class="hot-articles-container">
            <h3 class="hot-articles-text">热门文章</h3>
            <ul class="hot-articles">
                @foreach ($hot_articles as $hot_article)
                <li class="hot-article">
                    <a href="/{{ $blog->
                        user->nick }}/article/{{ $hot_article->id }}" target="_blank">{{ $hot_article->title }}
                    </a>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
    <div id="right-panel">
        <div class="articles">
            @foreach ($articles as $article)
            <a class="article" href="/{{ $blog->user->nick }}/article/{{ $article->id }}" target="_blank">
                <img src="{{ $article->
                image }}" class="image{{ $article->image?'':' none' }}" alt="{{ $article->title }}" />
                <div class="title">
                    {{ $article->is_top?'【置顶】':'' }}{{ $article->title }}
                    <span class="author">作者：{{ $article->author }}</span>
                </div>
                <p class="desc">
                    摘要：{{ html_entity_decode($article->desc, ENT_COMPAT, 'UTF-8') }}...
                </p>
                <div class="meta">
                    发布时间：{{ $article->created_at }} 阅读数（{{ $article->views_count }}） 评论（{{ $article->comments_count }}）
                </div>
            </a>
            @endforeach
        </div>
        {{ $articles->links() }}
    </div>
</div>
@endsection

@section('javascript')
@endsection