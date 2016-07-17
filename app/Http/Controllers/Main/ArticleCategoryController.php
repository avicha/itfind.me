<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\BlogRead;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogService;
use App\Http\Services\ArticleCategoryService;

class ArticleCategoryController extends Controller
{
    public function index(Request $request, $blog_id)
    {
        if($request->ajax()){
            $blog = BlogService::fetch($blog_id);
            event(new BlogRead($blog));
            $article_categories = ArticleCategoryService::searchByBlog($blog)->get();
            return response(['code' => 0, 'data' => $article_categories]);
        }
        else{
            return view('mobile.main.blog');
        }
    }
    public function show(Request $request, $id)
    {
        $article_category = ArticleCategoryService::fetch($id);
        return response()->json(['code' => 0, 'data' => $article_category], Response::HTTP_OK);
    }
}
