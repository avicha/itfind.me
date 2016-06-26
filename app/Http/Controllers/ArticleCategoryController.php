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
            return response()->json(['code' => 0, 'data' => ArticleCategory::where('user_id', $request->user()->id)->select(['id', 'name'])->get()->toArray()]);
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
        $article_category->user_id = $request->user()->id;
        $article_category->save();
        return response()->json(['code' => 0, 'data' => ['created_at' => $article_category->created_at->format('Y-m-d h:i:s'), 'id' => $article_category->id]]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article_category = ArticleCategory::select(['id', 'name'])->findOrfail($id);
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
        $article_category = ArticleCategory::findOrfail($id);
        $article_category->update($data);
        return response()->json(['code' => 0, 'data' => ['updated_at' => $article_category->updated_at->format('Y-m-d h:i:s')]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article_category = ArticleCategory::findOrfail($id);
        $article_category->delete();
        return response()->json(['code' => 0, 'data' => ['deleted_at' => $article_category->deleted_at->format('Y-m-d h:i:s')]]);
    }
}
