<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'articles';
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'author', 'category_id', 'tags', 'is_top', 'content', 'desc'];

    public function blog()
    {
        return $this->belongsTo('App\Http\Models\Blog', 'blog_id', 'id');
    }

    public function category()
    {
        return $this->hasOne('App\Http\Models\ArticleCategory', 'id', 'category_id');
    }
}
