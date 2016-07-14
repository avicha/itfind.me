<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Services\BlogService;

class BlogController extends Controller
{
    /**
     * Instantiate a new BlogController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('blog.exists', ['only' => ['show', 'edit', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view(\App\Common\Utils::getAgent().'.admin.blog.edit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only(['title', 'intro']);
        $res = BlogService::create($request->user()->id, $data);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $blog = $res['data'];
            return response()->json(['code' => 0, 'data' => ['created_at' => $blog->created_at->format('Y-m-d h:i:s'), 'id' => $blog->id]], Response::HTTP_CREATED);
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
        $blog = BlogService::get($request->user()->blog->id);
        return response()->json(['code' => 0, 'data' => $blog], Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        return view(\App\Common\Utils::getAgent().'.admin.blog.edit', ['id' => $request->user()->blog->id]);
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
        $data = $request->only(['title', 'intro']);
        $res = BlogService::update($request->user()->id, $data);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $blog = $res['data'];
            return response()->json(['code' => 0, 'data' => ['updated_at' => $blog->updated_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $res = BlogService::delete($request->user()->id);
        if($res['code']){
            return response()->json($res, $res['code']);
        }
        else{
            $blog = $res['data'];
            return response()->json(['code' => 0, 'data' => ['deleted_at' => $blog->deleted_at->format('Y-m-d h:i:s')]], Response::HTTP_OK);
        }
    }
}
