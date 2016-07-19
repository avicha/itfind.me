<!DOCTYPE html>
<html>
<head>
    @section('meta')
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
    <!-- 优先使用 IE 最新版本和 Chrome -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <!-- 页面描述 -->
    <meta name="description" content="@section('meta_description')管理后台 @show"/>
    <!-- 页面关键词 -->
    <meta name="keywords" content="@section('meta_keywords')blog,博客,管理后台 @show"/>
    <!-- 网页作者 -->
    <meta name="author" content="@section('meta_author')avicha, avichabc@gmail.com @show"/>
    <!-- 搜索引擎抓取 -->
    <meta name="robots" content="index,follow"/>
    @show
    <title>@section('title')管理后台 @show</title>
    <!-- 添加 favicon icon -->
    <link rel="shortcut icon" type="image/x-icon" href="@section('favicon'){{ config('app.static_url_prefix') }}/img/favicon.ico @show" />
    @section('stylesheet')
    <link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/libs/bootstrap/3.3.4/bootstrap.css">
    @show
</head>
<body>
    @section('body')
    @include('pc-auth.nav')
    <div id="root" class="container"></div>
    @show
    @section('javascript')
    <script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/jquery/2.2.4/jquery.js"></script>
    <script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/bootstrap/3.3.4/bootstrap.js"></script>
    <script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/react/15.1.0/react.js"></script>
    <script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/react/15.1.0/react-dom.js"></script>
    <script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/redux/3.5.2/redux.js"></script>
    <script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/react-redux/4.4.5/react-redux.js"></script>
    @show
</body>
</html>