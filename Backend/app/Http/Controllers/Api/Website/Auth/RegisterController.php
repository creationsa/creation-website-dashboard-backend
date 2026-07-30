<?php

namespace App\Http\Controllers\Api\Website\Auth;

use Exception;
use App\Models\User;
use App\Services\SMSService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Resources\Api\Website\User\ProfileResource;
use App\Http\Requests\Api\Website\Auth\{CheckCodeRequest, EditEmailRequest, RegisterPhoneRequest, RegisterRequest, SendCodeRequest, VerifyRequest};

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        if (isset($request->phone) && (substr($request->phone, 0, 1) != '5' || substr($request->phone, 0, 1) != '05')) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.worng_phone_format')], 422);
        }
        DB::beginTransaction();
        try {
            $code = mt_rand(1111, 9999);
            // $code = 1111;
            // TODO send otp
            $user_data = [
                'user_type' => 'client',
                'reset_code' => $code,
                'hash_code'  => generate_unique_code(8, '\\App\\Models\\User', 'hash_code', 'letters'),
                'points'    => 25
            ];
            $user = User::create(array_except($request->validated(), $request->profile_data) + $user_data + [$request->header('Accept-Language') && $request->header('Accept-Language') != null ? $request->header('Accept-Language') : 'en']);
            $user->profile()->create($request->profile_data);
            $token = JWTAuth::fromUser($user);
            data_set($user, 'token', $token);

            $message = " Your Darf code: " . $code;
            $phone   =  $user->phone;
            SMSService::sendFccSMS($message, $phone);
            
            DB::commit();
            return response()->json(['status' => 'success', 'data' => ProfileResource::make($user), 'message' => trans('app/client.auth.success_sign_up')]);
        } catch (Exception $e) {
            DB::rollback();
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.not_registered_try_again')], 422);
        }
    }

    public function checkCode(CheckCodeRequest $request)
    {
        $user = User::where(['email' => $request->email, 'user_type' => 'client'])
            ->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422));
            });

        if ($user->reset_code == $request->code) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_is_true')]);
        } else {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')], 422);
        }
    }

    public function verify(VerifyRequest $request)
    {
        $user = User::where(['reset_code' => $request->code, 'email' => $request->email, 'user_type' => 'client'])
            ->whereNull('phone_verified_at')->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')], 422));
            });

        DB::beginTransaction();
        try {
            $user->update(['reset_code' => null, 'phone_verified_at' => now()]);
            // $user->devices()->firstOrCreate($request->only(['device_token', 'type']));
            $token = JWTAuth::fromUser($user);
            data_set($user, 'token', $token);
            DB::commit();
            return response()->json(['status' => 'success', 'data' => new ProfileResource($user), 'message' => trans('app/client.auth.verify_sucess')]);
        } catch (Exception $e) {
            DB::rollback();
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function sendCode(SendCodeRequest $request)
    {
        $user = User::where(['email' => $request->email, 'user_type' => 'client'])->first();
        $code = mt_rand(1111, 9999);
        // $code = 1111 ;
        if (!$user) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422);
        }
        $user->update(['reset_code' => $code, 'phone_verified_at' => null]);
        $message = " Your Darf code: " . $code;
        $phone   =  $user->phone;
        SMSService::sendFccSMS($message, $phone);

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_send_successfully')]);
    }

    public function editEmail(EditEmailRequest $request)
    {
        // $code = mt_rand(1111, 9999);
        $user = User::where(['user_type' => 'client', 'phone_verified_at' => null])
            ->findOr(auth('api')->id(), function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422));
            });

        // $message = " Your Darf code: " . $code;
        // $phone   =  $user->phone;
        // SMSService::sendFccSMS($message, $phone);

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_send_successfully')]);
    }
}
