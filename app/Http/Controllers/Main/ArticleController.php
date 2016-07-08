<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogService;
use App\Http\Services\ArticleService;
use App\Http\Services\ArticleCategoryService;

class ArticleController extends Controller
{
    public function searchByCategory(Request $request, $nick, $id)
    {
        $res = BlogService::getByNick($nick);
        $blog = $res['data'];
        $categoryRes = ArticleCategoryService::get($id);
        $article_category = $categoryRes['data'];
        $articles = $blog->articles()->where('category_id', $id)->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
        $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
        return view(\App\Common\Utils::getAgent().'.main.blog.index', ['blog' => $blog, 'category' => $article_category, 'articles' => $articles, 'hot_articles' => $hot_articles]);
    }
    public function searchByKeyword(Request $request, $nick)
    {
        $kw = $request->query('kw');
        $res = BlogService::getByNick($nick);
        $blog = $res['data'];
        $articles = $blog->articles()->where('title', 'like', '%'.$kw.'%')->orWhere('content', 'like', '%'.$kw.'%')->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
        $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
        return view(\App\Common\Utils::getAgent().'.main.blog.index', ['blog' => $blog, 'kw' => $kw, 'articles' => $articles, 'hot_articles' => $hot_articles]);
    }

    public function show(Request $request, $nick, $id)
    {
        $res = BlogService::getByNick($nick);
        $blog = $res['data'];
        $articleRes = ArticleService::get($id);
        $article = $articleRes['data'];
        if($article->blog_id == $blog->id){
            return view(\App\Common\Utils::getAgent().'.main.article.detail', ['blog' => $blog, 'article' => $article]);
        }
    }
}
