@extends('pc-admin.app')

@section('meta')
@parent
<meta name="blog" content="{{ $blog or '' }}">
@endsection

@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/pc-admin/css/home.css">
@endsection

@section('title', '个人中心')

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/pc-admin/js/home.bundle.js"></script>
@endsection