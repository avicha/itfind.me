@extends('pc.admin.app')

@section('stylesheet')
@parent
<link rel="stylesheet" type="text/css" href="{{ config('app.static_host') }}/css/pc/admin/entries/index.css" />
@endsection

@section('javascript')
@parent
<script type="text/javascript" src="{{ config('app.static_host') }}/js/pc/admin/entries/index.bundle.js"></script>
@endsection