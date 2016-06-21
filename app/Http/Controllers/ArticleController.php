<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ArticleController extends Controller
{
    public function createView()
    {
        return view(\App\Common\Utils::getAgent().'.admin.article.edit');
    }
}
