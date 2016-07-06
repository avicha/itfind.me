<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\Blog;
use App\Http\Models\ArticleCategory;

/**
* 文章分类服务层
*/
class ArticleCategoryService extends BaseService
{
    /**
     * [getList 获取某个博客的文章分类列表]
     * @param  [type] $blog_id [博客ID]
     * @return [type]          [分类列表]
     */
    public static function getList($blog_id)
    {
        $blog = new Blog();
        $blog->id = $blog_id;
        return ['code' => 0, 'data' => $blog->article_categories()->select(['id', 'name', 'is_systemic'])->orderBy('sequence')->get()->toArray()];
    }
    /**
     * [create 为某个博客创建文章分类]
     * @param  [type]  $blog_id     [博客ID]
     * @param  [type]  $data        [文章分类数据]
     * @param  boolean $is_systemic [是否系统分类]
     * @return [type]               [创建的文章分类]
     */
    public static function create($blog_id, $data, $is_systemic = false)
    {
        $blog = new Blog();
        $blog->id = $blog_id;
        $article_category = new ArticleCategory();
        $article_category->name = $data['name'];
        $article_category->blog_id = $blog_id;
        $article_category->is_systemic = $is_systemic;
        $article_category->sequence = $blog->article_categories()->max('sequence') + 1;
        $article_category->save();
        return ['code' => 0, 'data' => $article_category];
    }
    /**
     * [get 获取某个文章分类]
     * @param  [type] $id      [文章分类ID]
     * @return [type]          [文章分类]
     */
    public static function get($id, $fields = ['id', 'name', 'is_systemic'])
    {
        $article_category = ArticleCategory::select($fields)->findOrFail($id);
        return ['code' => 0, 'data' => $article_category];
    }
    /**
     * [update 更新某个博客的文章分类]
     * @param  [type] $blog_id [博客ID]
     * @param  [type] $id      [文章分类ID]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的文章分类]
     */
    public static function update($blog_id, $id, $data)
    {
        $article_category = ArticleCategory::where(['blog_id' => $blog_id, 'id' => $id])->firstOrFail();
        if($article_category->is_systemic){
            return ['code' => Response::HTTP_FORBIDDEN, 'msg' => '禁止修改系统文章分类'];
        }else{
            $article_category->update($data);
            return ['code' => 0, 'data' => $article_category];
        }
    }
    /**
     * [delete 删除某个博客的文章分类]
     * @param  [type] $blog_id [博客ID]
     * @param  [type] $id      [文章分类ID]
     * @return [type]          [删除的文章分类]
     */
    public static function delete($blog_id, $id)
    {
        $article_category = ArticleCategory::where(['blog_id' => $blog_id, 'id' => $id])->firstOrFail();
        if($article_category->is_systemic){
            return ['code' => Response::HTTP_FORBIDDEN, 'msg' => '禁止删除系统文章分类'];
        }else{
            $systemic_article_category = ArticleCategory::where(['blog_id' => $blog_id, 'is_systemic' => true])->firstOrFail();
            $article_category->articles()->update(['category_id' => $systemic_article_category->id]);
            $article_category->delete();
            return ['code' => 0, 'data' => $article_category];
        }
    }
}