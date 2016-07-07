<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id')->comment('文章ID');
            $table->string('title', 60)->comment('标题');
            $table->string('author', 20)->comment('作者');
            $table->integer('category_id')->unsigned()->comment('分类');
            $table->string('tags', 60)->comment('标签');
            $table->text('content')->comment('正文');
            $table->text('desc', 120)->comment('摘要');
            $table->boolean('is_top')->default(false)->comment('是否置顶');
            $table->integer('blog_id')->unsigned()->comment('作者ID');
            $table->integer('views_count')->unsigned()->default(0)->comment('浏览数');
            $table->integer('likes_count')->unsigned()->default(0)->comment('喜欢数');
            $table->integer('comments_count')->unsigned()->default(0)->comment('评论数');
            $table->float('w')->comment('文章权重');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('articles');
    }
}
