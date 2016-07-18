<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AppController extends Controller
{
    public function mainIndexView()
    {
        switch (\App\Common\Utils::getAgent()) {
            case 'mobile':
                return view('mobile-main.index');
                break;
            
            default:
                return view('pc-main.index');
                break;
        }
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminHomeView(Request $request)
    {
        return view(\App\Common\Utils::getAgent().'.admin.home', ['blog' => $request->user()->blog]);
    }
}
