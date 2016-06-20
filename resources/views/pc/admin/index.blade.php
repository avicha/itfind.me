@extends('pc.app')

@section('title', Auth::user()->nick.'的博客-管理后台')
@section('meta')
    @parent
    @section('meta_description', Auth::user()->nick.'的博客-管理后台')
    @section('meta_keywords', 'blog,博客,管理后台')
    @section('meta_apple_title', Auth::user()->nick.'的博客-管理后台')
@endsection

@section('stylesheet')
    <link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/lib/bootstrap/3.3.4/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/pc/admin/entries/index.css" />
@endsection

@section('content')
@include('pc.auth.nav')
<div class="container">
    <div id="left-panel"></div>
    <div id="right-panel"></div>
</div>
@endsection

@section('javascript')
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/jquery/2.2.4/jquery.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/bootstrap/3.3.4/bootstrap.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react-dom.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/pc/admin/entries/index.bundle.js"></script>
@endsection