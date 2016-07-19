@extends('pc-admin.app')

@section('title', '文章列表')

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/pc-admin/js/article/list.bundle.js"></script>
@endsection