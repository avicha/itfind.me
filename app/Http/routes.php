<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
//后台
Route::group(['domain' => 'admin.itfind.me', 'namespace' => 'Admin', 'middleware' => 'auth'], function(){
    //首页
    Route::get('/', ['as' => 'admin_index', 'uses' => 'HomeController@index']);
});
//主站点
Route::group(['domain' => config('main_host')], function(){
    //首页
    Route::get('/', ['uses' => 'AppController@index']);
});

//注册、登录、退出登录
Route::group(['namespace' => 'Auth'], function(){
    Route::get('/login', ['as' => 'login', 'uses' => 'AuthController@showLoginForm']);
    Route::post('/login', 'AuthController@login');
    Route::get('/logout', ['as' => 'logout', 'uses' => 'AuthController@logout']);
    Route::get('/register', ['as' => 'register', 'uses' => 'AuthController@showRegistrationForm']);
    Route::post('/register', 'AuthController@register');
    Route::group(['prefix' => 'password'], function(){
        Route::get('/reset', 'AuthController@resetPasswordView');
    });
});