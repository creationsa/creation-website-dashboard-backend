<?php

namespace App\Traits;

use App\Models\User;
use App\Services\SMSService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Exceptions\HttpResponseException;

trait CheckUserStatusTrait
{
    public function checkUser(User $user, JsonResource $resource)
    {
        if ($user->is_ban || !$user->is_admin_active_user) {
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json([
                'status'  => 'fail',
                'data'    => null,
                'message' => trans('your account has been banned please contact the administrator', ['ban_reason' => $user->ban_reason]),
            ], 403));
        } elseif ($user->phone_verified_at == null) {
        $code  = /* OtpService::generateCode() */ 1111;
            // SMSService::sendVerificationCode($user->phone_code . $user->phone, $code);
            $user->update(['reset_code' => $code]);
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json([
                'status'  => 'success',
                'data'    => $resource,
                'message' => trans('The code sent Successfully'),
            ], 200));
        } elseif (in_array($user->user_type, ['admin', 'super_admin'])) {
            if (auth('api')->check()) auth('api')->logout();
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('You are trying to sign in by admin account')], 422));
        }
    }
}
