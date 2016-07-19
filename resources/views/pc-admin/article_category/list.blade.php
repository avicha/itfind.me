@extends('pc-admin.app')

@section('title', '文章分类')

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/pc-admin/js/article_category/list.bundle.js"></script>
@endsection