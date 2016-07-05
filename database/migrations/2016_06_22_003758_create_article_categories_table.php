<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_categories', function (Blueprint $table) {
            $table->increments('id')->comment('文章分类ID');
            $table->string('name')->comment('名称');
            $table->integer('blog_id')->unsigned()->comment('博客ID');
            $table->boolean('is_systemic')->comment('是否系统分类')->default(false);
            $table->integer('sequence')->unsigned()->comment('排列顺序');
            $table->integer('articles_count')->unsigned()->comment('该分类下文章数量');
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
        Schema::drop('article_categories');
    }
}
