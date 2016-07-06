<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class BlogExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->session()->has('blog')){
            $next($request);
        }
        else{
            if($request->ajax()){
                return response()->json(['code' => Response::HTTP_NO_CONTENT, 'msg' => '你还未开通博客'], Response::HTTP_NO_CONTENT);
            }
            else{
                return view(\App\Common\Utils::getAgent().'.admin.home');
            }
        }
    }
}
