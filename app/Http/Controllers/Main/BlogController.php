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
        $blog = BlogService::fetch($id);
        event(new BlogRead($blog));
        if(\App\Common\Utils::getAgent() == 'pc'){
            $articles = $blog->articles()->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
            $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
            return view('pc.main.blog.index', ['blog' => $blog, 'articles' => $articles, 'hot_articles' => $hot_articles]);
        }
        else{
            if($request->ajax()){
                return response(['code' => 0, 'data' => $blog]);
            }else{
                return view('mobile.main.blog', ['blog' => $blog]);
            }
        }
    }
}
