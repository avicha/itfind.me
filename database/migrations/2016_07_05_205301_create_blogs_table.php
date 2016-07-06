<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->comment('标题');
            $table->string('intro')->nullable()->comment('简介');
            $table->integer('views_count')->unsigned()->comment('浏览数');
            $table->integer('articles_count')->unsigned()->comment('文章数');
            $table->float('w')->comment('博客权重');
            $table->integer('user_id')->nullable()->unsigned()->comment('关联用户ID');
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
        Schema::drop('blogs');
    }
}
