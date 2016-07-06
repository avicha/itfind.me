<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'blogs';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'intro', 'user_id',
    ];
    protected $hidden = [
        'w', 'deleted_at', 'user_id', 'updated_at'
    ];
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    public function article_categories()
    {
        return $this->hasMany('App\Http\Models\ArticleCategory', 'blog_id', 'id');
    }
    public function articles()
    {
        return $this->hasMany('App\Http\Models\Article', 'blog_id', 'id');
    }
}
