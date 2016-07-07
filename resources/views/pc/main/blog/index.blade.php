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
        <div class="article-categories">
            @foreach ($blog->article_categories as $article_category)
            <a href="/{{ $blog->user->nick }}/category/{{ $article_category->id }}">{{ $article_category->name }}</a>
            @endforeach
        </div>
    </div>
</div>
<div id="content">
    <div id="left-panel"></div>
    <div id="right-panel">
        <div class="blog-info-container">
            
        </div>
    </div>
</div>
@endsection

@section('javascript')
@endsection