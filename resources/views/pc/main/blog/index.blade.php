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

@endsection

@section('javascript')
@endsection