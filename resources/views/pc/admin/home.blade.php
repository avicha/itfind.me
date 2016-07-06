@extends('pc.admin.app')

@section('meta')
@parent
<meta name="blog" content="{{ $blog or '' }}">
@endsection

@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/pc/admin/containers/home.css">
@endsection

@section('title', '个人中心')

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/pc/admin/entries/home.bundle.js"></script>
@endsection