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
    <!-- 忽略页面中的数字识别为电话，忽略email识别 -->
    <meta name="format-detection" content="telphone=no"/>
    <!-- 忽略email识别 -->
    <meta name="format-detection" content="email=no"/>
    <!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <!-- 设置苹果工具栏颜色 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <!-- 添加到主屏后的标题（iOS 6 新增） -->
    <meta name="apple-mobile-web-app-title" content="@section('meta_apple_title')itfind.me @show" />
    @show
    <title>itfind.me-@section('title')标题 @show</title>
    <!-- 添加 favicon icon -->
    <link rel="shortcut icon" type="image/x-icon" href="@section('favicon'){{ config('app.static_host') }}/img/common/favicon.ico @show" />
    @yield('stylesheet')
</head>
<body>
    <div id="content">
        @yield('content')
    </div>
    @yield('javascript')
</body>
</html>