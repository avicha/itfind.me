@extends('pc.app')

@section('title', '管理后台')

@section('meta')
    @parent
    @section('meta_description', '管理后台')
    @section('meta_keywords', 'blog,博客,管理后台')
    @section('meta_author', 'avicha, avichabc@gmail.com')
@endsection

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/lib/bootstrap/3.3.4/bootstrap.css">
@endsection

@section('content')
@include('pc.auth.nav')
<div class="container">
    <div class="row">
        <div id="left-panel" class="col-md-3"></div>
        <div id="right-panel" class="col-md-9"></div>
    </div>
</div>
@endsection

@section('javascript')
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/jquery/2.2.4/jquery.js"></script>
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/bootstrap/3.3.4/bootstrap.js"></script>
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react.js"></script>
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react-dom.js"></script>
@endsection