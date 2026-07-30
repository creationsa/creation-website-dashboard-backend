<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Resources\Json\JsonResource;

trait CheckUserStatusTrait
{
    public function checkUser(User $user, JsonResource $resource)
    {
        if ($user->is_ban) {
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json([
                'status'  => 'fail',
                'data'    => null,
                'message' => trans('app/client.auth.account_banned_by_admin', ['ban_reason' => $user->ban_reason]),
            ], 403));
        } elseif (!$user->is_admin_active_user) {
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json([
                'status'  => 'fail',
                'data'    => null,
                'message' => trans('app/client.auth.account_banned_by_admin', ['ban_reason' => $user->ban_reason]),
            ], 403));
        } elseif ($user->phone_verified_at == null) {
            $code = mt_rand(1111, 9999);
            // TODO send otp
            $user->update(['reset_code' => $code]);
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json([
                'status'  => 'success',
                'data'    => $resource,
                'message' => trans('app/client.auth.code_send_successfully'),
            ], 200));
        } elseif (in_array($user->user_type, ['admin', 'super_admin'])) {
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.trying_to_sign_up_for_admin_account')], 422));
        }
    }
}
