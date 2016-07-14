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
        $articles = ArticleService::getList($blog_id);
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
        return response(['code' => 0, 'data' => $articles->paginate(12)]);
    }

    public function searchByCategory(Request $request, $nick, $id)
    {
        $blog = BlogService::getByNick($nick);
        $categoryRes = ArticleCategoryService::get($id);
        $article_category = $categoryRes['data'];
        $articles = $blog->articles()->where('category_id', $id)->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
        $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
        event(new BlogRead($blog));
        return view(\App\Common\Utils::getAgent().'.main.blog.index', ['blog' => $blog, 'category' => $article_category, 'articles' => $articles, 'hot_articles' => $hot_articles]);
    }
    public function searchByKeyword(Request $request, $nick)
    {
        $kw = $request->query('kw');
        $blog = BlogService::getByNick($nick);
        $articles = $blog->articles()->where('title', 'like', '%'.$kw.'%')->orWhere('content', 'like', '%'.$kw.'%')->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
        $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
        event(new BlogRead($blog));
        return view(\App\Common\Utils::getAgent().'.main.blog.index', ['blog' => $blog, 'kw' => $kw, 'articles' => $articles, 'hot_articles' => $hot_articles]);
    }

    public function show(Request $request, $nick, $id)
    {
        $blog = BlogService::getByNick($nick);
        $articleRes = ArticleService::get($id);
        $article = $articleRes['data'];
        if($article->blog_id == $blog->id){
            event(new ArticleRead($article));
            event(new BlogRead($blog));
            return view(\App\Common\Utils::getAgent().'.main.article.detail', ['blog' => $blog, 'article' => $article]);
        }
    }
}
