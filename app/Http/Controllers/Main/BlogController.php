<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\BlogRead;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogService;

class BlogController extends Controller
{
    public function show(Request $request, $id)
    {
        if(\App\Common\Utils::getAgent() == 'pc' || $request->ajax()){
            $blog = BlogService::fetch($id);
            event(new BlogRead($blog));
            if($request->ajax()){
                $blog['user'] =  $blog->user;
                return response(['code' => 0, 'data' => $blog]);
            }
            else{
                $articles = $blog->articles()->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
                $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
                return view('pc-main.blog.index', ['blog' => $blog, 'articles' => $articles, 'hot_articles' => $hot_articles]);
            }
        }
        else{
            return view('mobile-main.blog');
        }
    }
}
