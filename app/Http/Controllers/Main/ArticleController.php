<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogService;
use App\Http\Services\ArticleService;

class ArticleController extends Controller
{
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
