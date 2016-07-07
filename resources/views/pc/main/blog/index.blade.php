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

@section('content')
<div id="header">
    <div class="container">
        <a href="/{{ $blog->user->nick }}" class="title">{{ $blog->title }}</a>
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
</div>
<div id="content">
    <div id="left-panel">
        <div class="articles">
            @foreach ($articles as $article)
            <div class="article">
                <img src="{{ $article->
                image }}" class="image{{ $article->image?'':' none' }}" alt="{{ $article->title }}" />
                <div class="title-container">
                    <a class="title" href="/{{ $blog->
                        user->nick }}/article/{{ $article->id }}">{{ $article->title }}
                    </a>
                    <span class="author">作者：{{ $article->author }}</span>
                </div>
                <p class="desc">
                    摘要：{{ html_entity_decode($article->desc, ENT_COMPAT, 'UTF-8') }}...&nbsp;
                    <a class="read-more" href="/{{ $blog->user->nick }}/article/{{ $article->id }}">阅读全文</a>
                </p>
                <div class="meta">
                    发布时间：{{ $article->created_at }} 阅读数（{{ $article->views_count }}） 评论（{{ $article->comments_count }}）
                </div>
            </div>
            @endforeach
        </div>
        {{ $articles->links() }}
    </div>
    <div id="right-panel">
        <div class="blog-info-container"></div>
    </div>
</div>
@endsection

@section('javascript')
@endsection