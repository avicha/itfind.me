@extends('pc-admin.app')

@section('meta')
@parent
<meta name="article-id" content="{{ $id or ''}}">
@endsection

@section('title', '编辑文章')

@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/libs/summernote/0.8.1/summernote.css">
@endsection

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/summernote/0.8.1/summernote.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/libs/summernote/0.8.1/lang/summernote-zh-CN.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/pc-admin/js/article/edit.bundle.js"></script>
@endsection