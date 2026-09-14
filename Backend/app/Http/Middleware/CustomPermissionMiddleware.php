<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomPermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $permission = null, $guard = null)
    {

        $allowedUrlArr = [
            'side-bar-permissions','profile.index','profile.update','profile.update_password','profile.update_company_profile',
            'permission.index','permission.store','permission.update','permission.destroy',
            'notifications.index','notifications.store','notifications.update','notifications.destroy','dashboard.admin.get_my_permissions',
            'statistics.index',
        ];

        if (auth()->guard('api')->check()) {

            $user = auth()->guard('api')->user();

            $permission = $request->route()->getName();

            // dd($permission);

            $user_permissions = $user->permissions() != null && ! empty($user->permissions()) ? $user->permissions()->pluck('back_route_name')->toArray() : [];

            if($permission == null || in_array($permission,$allowedUrlArr) || in_array($permission,$user_permissions) || $user->user_type == 'super_admin') {
                return $next($request);
            } else {
                return response()->json(['status'=>'fail','message' => 'Unauthorized', 'data' => null], 403);
            }

        } else {
            return response()->json(['status'=>'fail','message' => trans('login_firstly'), 'data' => null], 401);
        }




    }
}
