@extends('pc.admin.app')

@section('title', '写文章')

@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/lib/summernote/0.8.1/summernote.css">
@endsection

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/summernote/0.8.1/summernote.js"></script>
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/summernote/0.8.1/lang/summernote-zh-CN.js"></script>
<script type="text/javascript" src="{{ config('app.static_host') }}/js/lib/qs/1.0.0/qs.js"></script>
<script type="text/javascript" src="{{ config('app.static_host') }}/js/pc/admin/entries/article/edit.bundle.js"></script>
@endsection