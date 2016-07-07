<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id')->comment('用户ID');
            $table->string('phone')->unique()->comment('手机号码');
            $table->string('password')->comment('密码');
            $table->string('nick')->comment('昵称');
            $table->string('avatar')->nullable()->comment('头像');
            $table->boolean('active')->default(true)->comment('是否激活');
            $table->boolean('has_blog')->default(false)->comment('是否开通博客');
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
