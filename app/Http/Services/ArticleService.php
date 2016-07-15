<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\Article;
/**
* 文章服务层
*/
class ArticleService extends BaseService
{
    /**
     * [searchByBlog 获取某个博客的文章列表]
     * @param  [type] $blog    [博客]
     * @return [type]          [分类列表]
     */
    public static function searchByBlog($blog)
    {
        $with = ['category' => function($query){
            $query->select(['id', 'name']);
        }];
        return $blog->articles()->with($with);
    }
    /**
     * [create 为某个博客创建文章]
     * @param  [type]  $blog        [博客]
     * @param  [type]  $data        [文章数据]
     * @param  boolean $is_systemic [是否系统分类]
     * @return [type]               [创建的文章]
     */
    public static function create($blog, $data)
    {
        $article = new Article();
        $data['content'] = htmlentities($data['content'], ENT_COMPAT, 'UTF-8');
        $data['desc'] = htmlentities(substr($data['desc'], 0, 120), ENT_COMPAT, 'UTF-8');
        $article->title = $data['title'];
        $article->author = $data['author'];
        $article->category_id = $data['category_id'];
        $article->tags = $data['tags'];
        $article->content = $data['content'];
        $article->desc = $data['desc'];
        $article->is_top = $data['is_top'];
        $article->blog_id = $blog->id;
        $article->save();
        $blog->increment('articles_count');
        $article->category->increment('articles_count');
        return $article;
    }
    /**
     * [fetch 获取某篇文章]
     * @param  [type] $id      [文章ID]
     * @return [type]          [文章]
     */
    public static function fetch($id)
    {
        $with = ['category' => function($query){
            $query->select(['id', 'name']);
        }];
        $article = Article::with($with)->findOrFail($id);
        return $article;
    }
    /**
     * [update 更新某个博客的文章]
     * @param  [type] $blog    [博客]
     * @param  [type] $id      [文章ID]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的文章]
     */
    public static function update($blog, $id, $data)
    {
        $article = Article::where(['blog_id' => $blog->id, 'id' => $id])->firstOrFail();
        $data['desc'] = htmlentities(substr($data['desc'], 0, 120), ENT_COMPAT, 'UTF-8');
        $data['content'] = htmlentities($data['content'], ENT_COMPAT, 'UTF-8');
        $article->update($data);
        return $article;
    }
    /**
     * [delete 删除某个博客的文章]
     * @param  [type] $blog    [博客]
     * @param  [type] $id      [文章ID]
     * @return [type]          [删除的文章]
     */
    public static function delete($blog, $id)
    {
        $article = Article::where(['blog_id' => $blog->id, 'id' => $id])->firstOrFail();
        $article->delete();
        return $article;
    }
}