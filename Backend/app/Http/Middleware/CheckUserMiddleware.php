<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth('api')->check() /*&& auth('api')->user()->is_completed_data */&& auth('api')->user()->phone_verified_at && ! auth('api')->user()->is_ban && auth('api')->user()->is_admin_active_user){
            return $next($request);
        } elseif (auth('api')->check() && auth('api')->user()->is_ban) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('your account has been banned please contact the administrator', ['ban_reason' => auth('api')->user()->ban_reason])], 401);
        } elseif (auth('api')->check() && ! auth('api')->user()->is_admin_active_user) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('Your account is not active yet')], 401);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('You must complete the registration process first')], 401);
    }
}
