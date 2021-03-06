<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->guest()) {
            if ($request->ajax() || $request->wantsJson()) {
                return response(['code'=> Response::HTTP_UNAUTHORIZED, 'msg'=> 'Unauthorized.'], Response::HTTP_UNAUTHORIZED);
            } else {
                return redirect()->route('login', ['redirect_uri' => $request->getUri()]);
            }
        }
        return $next($request);
    }
}
