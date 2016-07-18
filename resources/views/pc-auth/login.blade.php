@extends('pc.app')

@section('meta_description', '登录页面')
@section('meta_keywords', '登录')
@section('meta_author', 'avicha, avichabc@gmail.com')
@section('meta_apple_title', '登录')
@section('title', '登录')
@section('stylesheet')
<link rel="stylesheet" type="text/css" href="{{ config('app.static_url_prefix') }}/css/lib/bootstrap/3.3.4/bootstrap.css">
@endsection

@section('body')
@include('pc.auth.nav')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">登录</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                        {{ csrf_field() }}
                        <input type="hidden" name="redirect_uri" value="{{ Request::query('redirect_uri') }}">
                        <div class="form-group{{ $errors->
                            has('phone') ? ' has-error' : '' }}">
                            <label for="phone" class="col-md-4 control-label">手机号码</label>

                            <div class="col-md-6">
                                <input id="phone" type="tel" class="form-control" name="phone" value="{{ old('phone') }}">
                                @if ($errors->has('phone'))
                                <span class="help-block"> <strong>{{ $errors->first('phone') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->
                            has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">密码</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password">
                                @if ($errors->has('password'))
                                <span class="help-block"> <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember">记住我</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary"> <i class="fa fa-btn fa-sign-in"></i>
                                    登录
                                </button>

                                <a class="btn btn-link" href="{{ url('/password/reset') }}">忘记密码？</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('javascript')
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/jquery/2.2.4/jquery.js"></script>
<script type="text/javascript" src="{{ config('app.static_url_prefix') }}/js/lib/bootstrap/3.3.4/bootstrap.js"></script>
@endsection