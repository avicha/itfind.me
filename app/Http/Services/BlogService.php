<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\User;
use App\Http\Models\Blog;
/**
* 博客服务层
*/
class BlogService extends BaseService
{
    /**
     * [create 为某个用户创建博客]
     * @param  [type]  $user_id     [用户ID]
     * @param  [type]  $data        [博客数据]
     * @return [type]               [创建的博客]
     */
    public static function create($user_id, $data)
    {
        $user = User::findOrFail($user_id);
        if(!$user->has_blog){
            $blog = new Blog();
            $blog->title = $data['title'];
            $blog->intro = $data['intro'];
            $blog->user_id = $user_id;
            $blog->save();
            ArticleCategoryService::create($blog->id, ['name' => '默认分类'], true);
            $user->has_blog = true;
            $user->save();
            return ['code' => 0, 'data' => $blog];
        }
        else{
            return self::update($user_id, $user->blog->id, $data);
        }
    }
    /**
     * [get 获取博客]
     * @param  [type] $id      [博客ID]
     * @return [type]          [博客]
     */
    public static function get($id, $fields = ['id', 'title', 'intro', 'created_at'])
    {
        $blog = Blog::select($fields)->findOrFail($id);
        return ['code' => 0, 'data' => $blog];
    }
    /**
     * [update 更新某个用户的博客]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的博客]
     */
    public static function update($user_id, $data)
    {
        $blog = Blog::where(['user_id' => $user_id])->firstOrFail();
        $blog->update($data);
        return ['code' => 0, 'data' => $blog];
    }
    /**
     * [delete 删除某个用户的博客]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [博客ID]
     * @return [type]          [删除的博客]
     */
    public static function delete($user_id)
    {
        $blog = Blog::where(['user_id' => $user_id])->firstOrFail();
        $blog->delete();
        return ['code' => 0, 'data' => $blog];
    }
}