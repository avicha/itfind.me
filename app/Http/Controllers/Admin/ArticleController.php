<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Services\ArticleService;

class ArticleController extends Controller
{
    /**
     * Instantiate a new ArticleCategoryController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('blog.exists');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->ajax()){
            $articles = ArticleService::searchByBlog($request->user()->blog)->orderBy('created_at', 'desc')->get();
            return response()->json(['code' => 0, 'data' => $articles], Response::HTTP_OK);
        }else{
            return view('pc-admin.article.list');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pc-admin.article.edit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only(['title', 'author', 'category_id', 'tags', 'content', 'desc', 'is_top']);
        $data['author'] = $data['author'] ?: $request->user()->nick;
        $article = ArticleService::create($request->user()->blog, $data);
        return response()->json(['code' => 0, 'data' => ['created_at' => $article->created_at->format('Y-m-d h:i:s'), 'id' => $article->id]], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if($request->ajax()){
            $article = ArticleService::fetch($id);
            return response()->json(['code' => 0, 'data' => $article], Response::HTTP_OK);
        }else{
            return view('pc-admin.article.detail', ['id' => $id]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('pc-admin.article.edit', ['id' => $id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->only(['title', 'author', 'category_id', 'tags', 'content', 'desc', 'is_top']);
        $data['author'] = $data['author'] ?: $request->user()->nick;
        $article = ArticleService::update($request->user()->blog, $id, $data);
        return response()->json(['code' => 0, 'data' => ['updated_at' => $article->updated_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $article = ArticleService::delete($request->user()->blog, $id);
        return response()->json(['code' => 0, 'data' => ['deleted_at' => $article->deleted_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
    }
}
