<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Services\ArticleService;
use Log;

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
        if($request->isXmlHttpRequest()){
            $res = ArticleService::getList($request->user()->blog->id);
            if($res['code']){
                return response()->json($res, $res['code']);
            }
            else{
                return response()->json($res, Response::HTTP_OK);
            }
        }else{
            return view(\App\Common\Utils::getAgent().'.admin.article.list');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view(\App\Common\Utils::getAgent().'.admin.article.edit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only(['title', 'category_id', 'tags', 'content', 'is_top']);
        $res = ArticleService::create($request->user()->blog->id, $data);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $article = $res['data'];
            return response()->json(['code' => 0, 'data' => ['created_at' => $article->created_at->format('Y-m-d h:i:s'), 'id' => $article->id]], Response::HTTP_CREATED);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if($request->isXmlHttpRequest()){
            $res = ArticleService::get($id);
            if($res['code']){
                return response()->json($res, $res['code']);
            }
            else{
                return response()->json($res, Response::HTTP_OK);
            }
        }else{
            return view(\App\Common\Utils::getAgent().'.admin.article.detail', ['id' => $id]);
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
        return view(\App\Common\Utils::getAgent().'.admin.article.edit', ['id' => $id]);
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
        $data = $request->only(['title', 'category_id', 'tags', 'content', 'is_top']);
        $res = ArticleService::update($request->user()->blog->id, $id, $data);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $article = $res['data'];
            return response()->json(['code' => 0, 'data' => ['updated_at' => $article->updated_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $res = ArticleService::delete($request->user()->blog->id, $id);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $article = $res['data'];
            return response()->json(['code' => 0, 'data' => ['deleted_at' => $article->deleted_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
        }
    }
}
