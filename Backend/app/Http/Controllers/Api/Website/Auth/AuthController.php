<?php

namespace App\Http\Controllers\Api\Website\Auth;

use App\Models\User;
use App\Services\SMSService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\CheckUserStatusTrait;
use App\Http\Requests\Api\Website\Auth\LoginRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Requests\Api\Website\Auth\CheckCodeRequest;
use App\Http\Resources\Api\Website\User\ProfileResource;
use App\Http\Requests\Api\Website\Auth\ResetPasswordRequest;
use App\Http\Requests\Api\Website\Auth\ForgotPasswordRequest;

class AuthController extends Controller
{
    use CheckUserStatusTrait;

    public function login(LoginRequest $request)
    {
        if (!$token = auth('api')->attempt($this->getCredentials($request) + ['user_type' => 'client'])) {
            return response()->json([
                'status' => 'fail',
                'data' => null,
                'message' => trans('app/client.auth.failed'),
            ], 422);
        }

        $user = auth('api')->user();

        $this->checkUser($user, new ProfileResource($user));

        if (in_array($user->user_type, ['admin', 'super_admin'])) {
            auth('api')->logout();
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.trying_to_sign_up_for_admin_account')], 422);
        }

        $user->update(['locale' => request()->header('Accept-Language')]);

        $user->profile()->update(['last_login_at' => now()]);
        $user->refresh();
        data_set($user, 'token', $token);
        return (new ProfileResource($user))->additional(['status' => 'success', 'message' => trans('app/client.auth.login_sucess')]);
    }

    public function logout()
    {
        if (auth('api')->check()) {
            $user = auth('api')->user();
            $user->profile()->update(['last_login_at' => null]);
            auth('api')->logout();
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.signed_out_successfully')]);
        }
    }

    public function getUserInfo(Request $request)
    {
        if (auth('api')->check()) {
            $user = auth('api')->user();
            return (new ProfileResource($user))->additional(['status' => 'success']);
        }
    }

    protected function getCredentials(Request $request)
    {
        $username = $request->phone;
        $credentials = [];
        switch ($username) {
            case filter_var($username, FILTER_VALIDATE_EMAIL):
                // $username = 'email';
                $credentials['email'] = $request->email;
                break;
            case is_numeric($username):
                // $username = 'phone';
                $credentials['phone'] = $request->phone;
                $credentials['phone_code'] = $request->phone_code;
                break;
            default:
                // $username = 'email';
                $credentials['email'] = $request->email;
                break;
        }
        if ($request->password) {
            $credentials['password'] = $request->password;
        }

        return $credentials;
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $user = User::where(['email' => $request->email, 'user_type' => 'client'])
        // ->whereNotNull('phone_verified_at')
            ->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422));
            });

        // $this->checkUser($user, new ProfileResource($user));

        $code = mt_rand(1111, 9999);
        // $code = 1111;
        
        $user->update(['reset_code' => $code]);
        
        $message = " Your Darf code: " . $code;
        $phone   =  $user->phone;
        SMSService::sendFccSMS($message, $phone);

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_send_successfully')]);
    }

    public function checkCode(CheckCodeRequest $request)
    {
        $user = User::where(['email' => $request->email, 'user_type' => 'client'])
            ->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422));
            });

        // $this->checkUser($user, new ProfileResource($user));

        if ($user->reset_code == $request->code) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_is_true')]);
        } else {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')], 422);
        }
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $user = User::where(['email' => $request->email, 'user_type' => 'client'])
        // ->whereNotNull('phone_verified_at')
        // ->doesntHave('social')
            ->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422));
            });

        // $this->checkUser($user, new ProfileResource($user));

        if ($user->reset_code == $request->code) {
            $user->update(['password' => $request->password, 'reset_code' => null]);
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.success_change_password')]);
        }

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')]);
    }
}
