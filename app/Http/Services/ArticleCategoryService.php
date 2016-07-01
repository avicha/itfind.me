<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use App\Http\Models\User;
use App\Http\Models\ArticleCategory;
/**
* 文章分类服务层
*/
class ArticleCategoryService extends BaseService
{
    /**
     * [getList 获取某个用户的文章分类列表]
     * @param  [type] $user_id [用户ID]
     * @return [type]          [分类列表]
     */
    public static function getList($user_id)
    {
        $user = new User();
        $user->id = $user_id;
        return ['code' => 0, 'data' => $user->article_categories()->select(['id', 'name', 'is_systemic'])->orderBy('sequence')->get()->toArray()];
    }
    /**
     * [create 为某个用户创建文章分类]
     * @param  [type]  $user_id     [用户ID]
     * @param  [type]  $data        [文章分类数据]
     * @param  boolean $is_systemic [是否系统分类]
     * @return [type]               [创建的文章分类]
     */
    public static function create($user_id, $data, $is_systemic = false)
    {
        $user = new User();
        $user->id = $user_id;
        $article_category = new ArticleCategory();
        $article_category->name = $data['name'];
        $article_category->user_id = $user_id;
        $article_category->is_systemic = $is_systemic;
        $article_category->sequence = $user->article_categories()->max('sequence') + 1;
        $article_category->save();
        return ['code' => 0, 'data' => $article_category];
    }
    /**
     * [get 获取某个用户的文章分类]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [文章分类ID]
     * @return [type]          [文章分类]
     */
    public static function get($user_id, $id)
    {
        $article_category = ArticleCategory::select(['id', 'name', 'is_systemic'])->where(['user_id' => $user_id, 'id' => $id])->firstOrFail();
        return ['code' => 0, 'data' => $article_category];
    }
    /**
     * [update 更新某个用户的文章分类]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [文章分类ID]
     * @param  [type] $data    [更新数据]
     * @return [type]          [更新的文章分类]
     */
    public static function update($user_id, $id, $data)
    {
        $article_category = ArticleCategory::where(['user_id' => $user_id, 'id' => $id])->firstOrFail();
        if($article_category->is_systemic){
            return ['code' => Response::HTTP_FORBIDDEN, 'msg' => '禁止修改系统文章分类'];
        }else{
            $article_category->update($data);
            return ['code' => 0, 'data' => $article_category];
        }
    }
    /**
     * [delete 删除某个用户的文章分类]
     * @param  [type] $user_id [用户ID]
     * @param  [type] $id      [文章分类ID]
     * @return [type]          [删除的文章分类]
     */
    public static function delete($user_id, $id)
    {
        $article_category = ArticleCategory::where(['user_id' => $user_id, 'id' => $id])->firstOrFail();
        if($article_category->is_systemic){
            return ['code' => Response::HTTP_FORBIDDEN, 'msg' => '禁止删除系统文章分类'];
        }else{
            $article_category->delete();
            return ['code' => 0, 'data' => $article_category];
        }
    }
}