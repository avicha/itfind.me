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
Route::group(['middleware' => 'web'], function(){
    Route::group(['domain' => 'itfind.me', 'namespace' => 'Admin', 'middleware' => 'auth'], function(){
        Route::get('/', 'HomeController@index');
    });
    Route::group(['namespace' => 'Auth'], function(){
        Route::get('/login', 'AuthController@loginView');
        Route::get('/register', 'AuthController@registerView');
    });
});