@extends('pc.app')
@section('title', 'Avicha\'s Blog')

@section('meta')
    @parent
    @section('meta_description', 'Avicha的博客')
    @section('meta_keywords', 'Avicha,blog')
    @section('meta_apple_title', 'Avicha的博客')
@stop

@section('stylesheet')
    <link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/pc/admin/entries/index.css" />
@stop

@section('body')
@stop

@section('javascript')
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/react/15.1.0/react-dom.js"></script>
    <script type="text/javascript" src="{{ config('app.static_host') }}/js/pc/admin/entries/index.bundle.js"></script>
@stop