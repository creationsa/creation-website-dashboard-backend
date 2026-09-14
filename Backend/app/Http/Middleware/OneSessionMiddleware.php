<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class OneSessionMiddleware
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
        if (auth('api')->check()) {
            $user                = auth('api')->user();
            $payload             = JWTAuth::parseToken()->getPayload();
            // $token_last_login_at = Carbon::parse($payload->get('last_login_at'), $payload->get('timezone'));
            $token_last_login_at = Carbon::parse($payload->get('iat'));

            $user_last_login_at  = $user->last_login_at;
            $allow_session_from  = $user->profile?->allow_session_from;

            if (($allow_session_from && $allow_session_from > $token_last_login_at) || ($user_last_login_at && $user_last_login_at > $token_last_login_at)) {
                throw new AuthenticationException();
            }
        }

        return $next($request);
    }
}
