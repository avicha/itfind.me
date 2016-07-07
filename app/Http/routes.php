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

//个人中心
Route::group(['domain' => config('app.admin_host'), 'middleware' => 'auth', 'namespace' => 'Admin'], function(){
    //个人中心首页
    Route::get('/', ['as' => 'admin_index', 'uses' => '\App\Http\Controllers\AppController@adminHomeView']);
    //文章分类
    Route::resource('article_category', 'ArticleCategoryController');
    //文章管理
    Route::resource('article', 'ArticleController');
    //博客管理
    Route::group(['prefix' => 'blog'], function(){
        Route::get('/{id}', 'BlogController@show')->where(['id' => '\d+']);
        Route::get('/create', 'BlogController@create');
        Route::get('/edit', 'BlogController@edit');
        Route::post('/', 'BlogController@store');
        Route::put('/{id}', 'BlogController@update')->where(['id' => '\d+']);
    });
});

//主站点
Route::group(['domain' => config('app.main_host'), 'namespace' => 'Main'], function(){
    //首页
    Route::get('/', ['as' => 'main_index', 'uses' => '\App\Http\Controllers\AppController@mainIndexView']);
    Route::get('/{nick}', 'BlogController@show');
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