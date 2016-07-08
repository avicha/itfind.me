<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogService;

class BlogController extends Controller
{
    public function show(Request $request, $nick)
    {
        $res = BlogService::getByNick($nick);
        $blog = $res['data'];
        $articles = $blog->articles()->orderBy('is_top', 'desc')->orderBy('created_at', 'desc')->paginate(12);
        $hot_articles = $blog->articles()->orderBy('w', 'desc')->limit(10)->get();
        return view(\App\Common\Utils::getAgent().'.main.blog.index', ['blog' => $blog, 'articles' => $articles, 'hot_articles' => $hot_articles]);
    }
}
