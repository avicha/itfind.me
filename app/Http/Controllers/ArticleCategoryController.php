<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Models\ArticleCategory;

class ArticleCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->isXmlHttpRequest()){
            return response()->json(['code' => 0, 'data' => $request->user()->article_categories->toArray()]);
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
        $article_category = new ArticleCategory();
        $article_category->name = $request->input('name');
        $request->user()->createArticleCategory($article_category);
        return response()->json(['code' => 0, 'data' => ['created_at' => $article_category->created_at->format('Y-m-d h:i:s'), 'is_systemic' => $article_category->is_systemic, 'id' => $article_category->id]]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $article_category = $request->user()->getArticleCategory($id);
        return response()->json(['code' => 0, 'data' => $article_category]);
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
        $article_category = $request->user()->updateArticleCategory($id, $data);
        return response()->json(['code' => 0, 'data' => ['updated_at' => $article_category->updated_at->format('Y-m-d h:i:s')]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $article_category = $request->user()->deleteArticleCategory($id);
        return response()->json(['code' => 0, 'data' => ['deleted_at' => $article_category->deleted_at->format('Y-m-d h:i:s')]]);
    }
}
