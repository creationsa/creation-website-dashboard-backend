<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Auth\{LoginRequest};
use App\Http\Resources\Api\Dashboard\Admin\Auth\UserResource;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $token = auth('api')->attempt($request->validated());

        if (!$token) return $this->errorResponse(trans('Invalid credentials'), 403);

        $auth = auth('api')->user();
        $user = User::find($auth->id);

        if (!$user->is_admin_active_user) {
            auth('api')->logout();
            return $this->errorResponse(trans('Inactive'), 403);
        }

        if ($user->is_ban) {
            auth('api')->logout();
            return $this->errorResponse(trans('You have been blocked'), 403);
        }

        $user->profile()->update(['last_login_at' => now()]);

        data_set($user, 'token', $token);
        return (new UserResource($user))->additional(['status' => 'success', 'message' =>  trans('You have successfully logged in')]);
    }

    public function logout()
    {
        auth('api')->logout();
        return $this->successResponse(trans('You have successfully logged out'));
    }
}
