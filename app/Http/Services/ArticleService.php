<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\User;
use App\Http\Models\Article;
/**
* 文章服务层
*/
class ArticleService extends BaseService
{
    /**
     * [getList 获取某个用户的文章列表]
     * @param  [type] $user_id [用户ID]
     * @return [type]          [分类列表]
     */
    public static function getList($user_id)
    {
        $user = new User();
        $user->id = $user_id;
        $with = ['category' => function($query){
            $query->select(['id', 'name']);
        }];
        return ['code' => 0, 'data' => $user->articles()->select(['id', 'title', 'category_id', 'tags', 'content', 'created_at'])->with($with)->orderBy('created_at', 'desc')->get()->toArray()];
    }
    /**
     * [create 为某个用户创建文章]
     * @param  [type]  $user_id     [用户ID]
     * @param  [type]  $data        [文章数据]
     * @param  boolean $is_systemic [是否系统分类]
     * @return [type]               [创建的文章]
     */
    public static function create($user_id, $data)
    {
        $article = new Article();
        $article->title = $data['title'];
        $article->category_id = $data['category_id'];
        $article->tags = $data['tags'];
        $article->content = $data['content'];
        $article->user_id = $user_id;
        $article->save();
        return ['code' => 0, 'data' => $article];
    }
    /**
     * [get 获取某个用户的文章]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [文章ID]
     * @return [type]          [文章]
     */
    public static function get($id, $fields = ['id', 'title', 'category_id', 'tags', 'content', 'created_at'])
    {
        $article = Article::select($fields)->findOrFail($id);
        return ['code' => 0, 'data' => $article];
    }
    /**
     * [update 更新某个用户的文章]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [文章ID]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的文章]
     */
    public static function update($user_id, $id, $data)
    {
        $article = Article::where(['user_id' => $user_id, 'id' => $id])->firstOrFail();
        $article->update($data);
        return ['code' => 0, 'data' => $article];
    }
    /**
     * [delete 删除某个用户的文章]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [文章ID]
     * @return [type]          [删除的文章]
     */
    public static function delete($user_id, $id)
    {
        $article = Article::where(['user_id' => $user_id, 'id' => $id])->firstOrFail();
        $article->delete();
        return ['code' => 0, 'data' => $article];
    }
}