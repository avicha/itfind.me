@extends('pc.admin.app')

@section('title', '文章文章分类')

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_host') }}/js/pc/admin/entries/article_category/list.bundle.js"></script>
@endsection