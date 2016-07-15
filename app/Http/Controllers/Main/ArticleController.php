<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\ArticleRead;
use App\Events\BlogRead;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogService;
use App\Http\Services\ArticleService;
use App\Http\Services\ArticleCategoryService;

class ArticleController extends Controller
{
    public function index(Request $request, $blog_id)
    {
        $resp = [];
        $blog = BlogService::fetch($blog_id);
        $resp['blog'] = $blog;
        $articles = ArticleService::searchByBlog($blog);
        switch ($request->query('order')) {
            case 'created_at':
                $articles->orderBy('created_at');
                break;
            case '-created_at':
                $articles->orderBy('created_at', 'desc');
                break;
            default:
                # code...
                break;
        }
        $category_id = $request->query('category_id');
        $kw = $request->query('kw');
        if($category_id){
            $category = ArticleCategoryService::fetch($category_id);
            $articles->where('category_id', $category_id);
            $resp['category'] = $category;
        }
        if($kw){
            $articles->where('title', 'like', '%'.$kw.'%')->orWhere('content', 'like', '%'.$kw.'%');
            $resp['kw'] = $kw;
        }
        if($request->ajax()){
            return response(['code' => 0, 'data' => $articles->paginate(12)]);
        }
        else{
            $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
            $resp['hot_articles'] = $hot_articles;
            $resp['articles'] = $articles->paginate(12);
            event(new BlogRead($blog));
            return view(\App\Common\Utils::getAgent().'.main.blog.index', $resp);
        }
    }

    public function show(Request $request, $id)
    {
        $article = ArticleService::fetch($id);
        $blog = $article->blog;
        event(new ArticleRead($article));
        event(new BlogRead($blog));
        return view(\App\Common\Utils::getAgent().'.main.article.detail', ['blog' => $blog, 'article' => $article]);
    }
}
