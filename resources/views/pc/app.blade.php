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
    <meta name="description" content="@section('meta_description')不超过150个字符 @show"/>
    <!-- 页面关键词 -->
    <meta name="keywords" content="@section('meta_keywords') @show"/>
    <!-- 网页作者 -->
    <meta name="author" content="@section('meta_author')name, email@gmail.com @show"/>
    <!-- 搜索引擎抓取 -->
    <meta name="robots" content="index,follow"/>
    @show
    <title>@section('title')itfind.me @show</title>
    <!-- 添加 favicon icon -->
    <link rel="shortcut icon" type="image/x-icon" href="@section('favicon'){{ config('app.static_url_prefix') }}/img/common/favicon.ico @show" />
    @yield('stylesheet')
</head>
<body>
    @yield('content')
    @yield('javascript')
</body>
</html>