@extends('pc.admin.app')

@section('meta')
@parent
<meta name="article-id" content="{{ $id }}">
@endsection

@section('title', '文章预览')

@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/pc/admin/containers/article/detail.css">
@endsection

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/pc/admin/entries/article/detail.bundle.js"></script>
@endsection