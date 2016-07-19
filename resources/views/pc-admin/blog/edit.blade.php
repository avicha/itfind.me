@extends('pc-admin.app')

@section('meta')
@parent
<meta name="blog-id" content="{{ $id or ''}}">
@endsection

@section('title', isset($id) ? '博客设置':'开通博客')

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/pc-admin/js/blog/edit.bundle.js"></script>
@endsection