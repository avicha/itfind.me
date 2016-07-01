<?php

namespace App\Http\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Exception;
class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'phone', 'nick', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function article_categories()
    {
        return $this->hasMany('App\Http\Models\ArticleCategory', 'user_id', 'id')->select(['id', 'name', 'is_systemic'])->orderBy('sequence');
    }

    public function createArticleCategory($article_category)
    {
        $article_category->user_id = $this->id;
        $article_category->sequence = $this->article_categories()->max('sequence')+1;
        $article_category->save();
        return $article_category;
    }

    public function getArticleCategory($id)
    {
        return ArticleCategory::select(['id', 'name', 'is_systemic'])->where(['user_id' => $this->id, 'id' => $id])->firstOrFail();
    }

    public function updateArticleCategory($id, $data)
    {
        $article_category = ArticleCategory::where(['user_id' => $this->id, 'id' => $id])->firstOrFail();
        if($article_category->is_systemic){
            throw new Exception('禁止修改系统文章分类');
        }else{
            $article_category->update($data);
            return $article_category;
        }
    }

    public function deleteArticleCategory($id)
    {
        $article_category = ArticleCategory::where(['user_id' => $this->id, 'id' => $id])->firstOrFail();
        if($article_category->is_systemic){
            throw new Exception('禁止删除系统文章分类');
        }else{
            $article_category->delete();
            return $article_category;
        }
    }
}
