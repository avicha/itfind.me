@extends('pc.admin.app')

@section('title', '个人中心')
@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/pc/admin/containers/index.css" />
@endsection

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/pc/admin/entries/index.bundle.js"></script>
@endsection