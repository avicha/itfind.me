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
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'deleted_at', 'w',
    ];
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

    public function getDescAttribute($value)
    {
        return html_entity_decode($value, ENT_COMPAT, 'UTF-8');
    }

    public function getContentAttribute($value)
    {
        return html_entity_decode($value, ENT_COMPAT, 'UTF-8');
    }
}
