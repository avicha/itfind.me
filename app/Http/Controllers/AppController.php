<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AppController extends Controller
{
    public function index()
    {
        return view(\App\Common\Utils::getAgent().'.index');
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminIndexView()
    {
        return view(\App\Common\Utils::getAgent().'.admin.index');
    }
}
