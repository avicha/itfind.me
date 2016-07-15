@extends('mobile.app')

@section('title', $blog->title)

@section('meta')
    @parent
    @section('meta_description', $blog->intro)
    @section('meta_keywords', 'blog,博客,itfind.me')
    @section('meta_author', 'avicha, avichabc@gmail.com')
    <meta name="blog-id" content="{{ $blog->id }}">
@endsection

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/mobile/main/app.css">
@endsection

@section('body')
<div id="root"></div>
@endsection

@section('javascript')
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/react/15.1.0/react-dev.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/react/15.1.0/react-dom-dev.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/redux/3.5.2/redux.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/react-redux/4.4.5/react-redux.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/mobile/main/app.bundle.js"></script>
@endsection