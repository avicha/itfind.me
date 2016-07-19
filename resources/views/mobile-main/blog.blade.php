@extends('mobile-main.app')

@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/mobile-main/css/app.css">
@endsection

@section('body')
<div id="root"></div>
@endsection

@section('javascript')
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/react/15.1.0/react.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/react/15.1.0/react-dom.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/redux/3.5.2/redux.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/react-redux/4.4.5/react-redux.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/mobile-main/js/app.bundle.js"></script>
@endsection