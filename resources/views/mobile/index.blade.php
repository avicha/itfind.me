@extends('mobile.app')
@section('title', 'Avicha\'s Blog')

@section('meta')
    @parent
    @section('meta_description', 'Avicha的博客')
    @section('meta_keywords', 'Avicha,blog')
    @section('meta_apple_title', 'Avicha的博客')
@stop

@section('stylesheet')
    <link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/mobile/entries/index.css" />
@stop

@section('body')
    <div id="container"></div>
@stop

@section('javascript')
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react-dom.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/mobile/entries/index.bundle.js"></script>
@stop