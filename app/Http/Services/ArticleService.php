<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\Article;
use App\Http\Models\Blog;
/**
* 文章服务层
*/
class ArticleService extends BaseService
{
    /**
     * [getList 获取某个博客的文章列表]
     * @param  [type] $blog_id [博客ID]
     * @return [type]          [分类列表]
     */
    public static function getList($blog_id)
    {
        $blog = new Blog();
        $blog->id = $blog_id;
        $with = ['category' => function($query){
            $query->select(['id', 'name']);
        }];
        return ['code' => 0, 'data' => $blog->articles()->select(['id', 'title', 'author', 'category_id', 'tags', 'content', 'desc', 'is_top', 'created_at'])->with($with)->orderBy('created_at', 'desc')->get()->toArray()];
    }
    /**
     * [create 为某个博客创建文章]
     * @param  [type]  $blog_id     [博客ID]
     * @param  [type]  $data        [文章数据]
     * @param  boolean $is_systemic [是否系统分类]
     * @return [type]               [创建的文章]
     */
    public static function create($blog_id, $data)
    {
        $article = new Article();
        $article->title = $data['title'];
        $article->author = $data['author'];
        $article->category_id = $data['category_id'];
        $article->tags = $data['tags'];
        $article->content = $data['content'];
        $article->desc = $data['desc'];
        $article->is_top = $data['is_top'];
        $article->blog_id = $blog_id;
        $article->save();
        Blog::findOrFail($blog_id)->increment('articles_count');
        return ['code' => 0, 'data' => $article];
    }
    /**
     * [get 获取某篇文章]
     * @param  [type] $id      [文章ID]
     * @return [type]          [文章]
     */
    public static function get($id, $fields = ['id', 'title', 'author', 'category_id', 'tags', 'content', 'desc', 'is_top', 'created_at'])
    {
        $with = ['category' => function($query){
            $query->select(['id', 'name']);
        }];
        $article = Article::select($fields)->with($with)->findOrFail($id);
        return ['code' => 0, 'data' => $article];
    }
    /**
     * [update 更新某个博客的文章]
     * @param  [type] $blog_id [博客ID]
     * @param  [type] $id      [文章ID]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的文章]
     */
    public static function update($blog_id, $id, $data)
    {
        $article = Article::where(['blog_id' => $blog_id, 'id' => $id])->firstOrFail();
        $article->update($data);
        return ['code' => 0, 'data' => $article];
    }
    /**
     * [delete 删除某个博客的文章]
     * @param  [type] $blog_id [博客ID]
     * @param  [type] $id      [文章ID]
     * @return [type]          [删除的文章]
     */
    public static function delete($blog_id, $id)
    {
        $article = Article::where(['blog_id' => $blog_id, 'id' => $id])->firstOrFail();
        $article->delete();
        return ['code' => 0, 'data' => $article];
    }
}