<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\Blog;
/**
* 博客服务层
*/
class BlogService extends BaseService
{
    /**
     * [create 为某个用户创建博客]
     * @param  [type]  $user        [用户]
     * @param  [type]  $data        [博客数据]
     * @return [type]               [创建的博客]
     */
    public static function create($user, $data)
    {
        if(!$user->has_blog){
            $blog = new Blog();
            $blog->title = $data['title'];
            $blog->intro = $data['intro'];
            $blog->user_id = $user->id;
            $blog->save();
            ArticleCategoryService::create($blog, ['name' => '默认分类'], true);
            $user->has_blog = true;
            $user->save();
            return $blog;
        }
        else{
            return self::update($user, $data);
        }
    }
    /**
     * [fetch 获取博客]
     * @param  [type] $id      [博客ID]
     * @return [type]          [博客]
     */
    public static function fetch($id)
    {
        $blog = Blog::findOrFail($id);
        return $blog;
    }
    /**
     * [update 更新某个用户的博客]
     * @param  [type] $user    [用户]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的博客]
     */
    public static function update($user, $data)
    {
        $blog = $user->blog;
        $blog->update($data);
        return $blog;
    }
    /**
     * [delete 删除某个用户的博客]
     * @param  [type] $user    [用户]
     * @param  [type] $id      [博客ID]
     * @return [type]          [删除的博客]
     */
    public static function delete($user)
    {
        $blog = $user->blog;
        $blog->delete();
        $user->has_blog = false;
        $user->save();
        return $blog;
    }
}