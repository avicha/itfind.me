<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Services\ArticleCategoryService;

class ArticleCategoryController extends Controller
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
            $res = ArticleCategoryService::getList($request->user()->blog->id);
            if($res['code']){
                return response()->json($res, $res['code']);
            }
            else{
                return response()->json($res, Response::HTTP_OK);
            }
        }else{
            return view(\App\Common\Utils::getAgent().'.admin.article_category.list');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only(['name']);
        $res = ArticleCategoryService::create($request->user()->blog->id, $data);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $article_category = $res['data'];
            return response()->json(['code' => 0, 'data' => ['created_at' => $article_category->created_at->format('Y-m-d h:i:s'), 'is_systemic' => $article_category->is_systemic, 'id' => $article_category->id]], Response::HTTP_CREATED);
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
        $res = ArticleCategoryService::get($id);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            return response()->json($res, Response::HTTP_OK);
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
        //
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
        $data = $request->only(['name']);
        $res = ArticleCategoryService::update($request->user()->blog->id, $id, $data);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $article_category = $res['data'];
            return response()->json(['code' => 0, 'data' => ['updated_at' => $article_category->updated_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
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
        $res = ArticleCategoryService::delete($request->user()->blog->id, $id);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $article_category = $res['data'];
            return response()->json(['code' => 0, 'data' => ['deleted_at' => $article_category->deleted_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
        }
    }
}
