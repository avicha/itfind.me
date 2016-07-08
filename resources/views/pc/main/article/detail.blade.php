@extends('pc.app')

@section('title', $article->title)

@section('meta')
    @parent
    @section('meta_description', $article->title)
    @section('meta_keywords', 'blog,博客,itfind.me,'.$article->tags)
    @section('meta_author', $article->author)
@endsection

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/pc/main/article/detail.css">
@endsection

@section('body')
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
    <div class="article">
        <h3 class="title">{{ $article->is_top ? '【置顶】' : '' }}{{ $article->title }}</h3>
        <div class="meta">
            <span class="author">作者：{{ $article->author }}</span>
            <span class="created_at">发布于：{{ $article->created_at }}</span>
            <div class="tags">
                标签：
            @foreach(explode(',', $article->tags) as $tag)
                <a class="tag" href="/{{ $blog->user->nick }}/tag/{{ $tag }}">{{ $tag }}</a>
                @endforeach
            </div>
            <div class="category">
                分类：
                <a class="category-link" href="/{{ $blog->
                    user->nick }}/category/{{ $article->category->id }}">{{ $article->category->name }}
                </a>
            </div>
        </div>
        <div class="article-content">{!! $article->content !!}</div>
    </div>

</div>
@endsection

@section('javascript')
@endsection