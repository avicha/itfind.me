@extends('pc.app')

@section('title', '管理后台')

@section('meta')
    @parent
    @section('meta_description', '管理后台')
    @section('meta_keywords', 'blog,博客,管理后台')
    @section('meta_author', 'avicha, avichabc@gmail.com')
    <meta name="nick" content="{{ Auth::user()->nick }}">
@endsection

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/lib/bootstrap/3.3.4/bootstrap.css">
@endsection

@section('content')
@include('pc.auth.nav')
<div id="root" class="container"></div>
@endsection

@section('javascript')
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/jquery/2.2.4/jquery.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/bootstrap/3.3.4/bootstrap.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/react/15.1.0/react.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/react/15.1.0/react-dom.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/redux/3.5.2/redux.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/react-redux/4.4.5/react-redux.js"></script>
@endsection