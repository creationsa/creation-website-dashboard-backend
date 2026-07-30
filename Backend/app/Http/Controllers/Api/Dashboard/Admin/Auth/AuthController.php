<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Auth;

use Exception;
use App\Models\User;
use App\Mail\OtpMail;
use App\Traits\ApiResponse;
use App\Services\GmailService;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Requests\Api\Website\Auth\SendCodeRequest;
use App\Http\Resources\Api\Dashboard\Admin\Auth\UserResource;
use App\Http\Requests\Api\Dashboard\Admin\Auth\{VerifyRequest, LoginRequest};

class AuthController extends Controller
{
    use ApiResponse ;

    public function login(LoginRequest $request)
    {
        $data['code'] = mt_rand(1111, 9999);

        $token = auth('api')->attempt($request->validated());

        if (!$token) return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.auth.credentials_not_found')], 403);

        $user = auth('api')->user();

        if (!$user->is_admin_active_user) {
            auth('api')->logout();
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.auth.not_active')], 403);
        }

        if ($user->is_ban) {
            auth('api')->logout();
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.auth.not_ban')], 403);
        }
        if($user->otp_num >= 5) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'You have reached the maximum number of attempts. Please try again later.'], 422);
        }

        $user->update(['reset_code' => $data['code'], 'phone_verified_at' => null, 'otp_num' => $user->otp_num + 1]);

        // data_set($user, 'token', $token);
        $gmailService = new GmailService();
        $htmlBody = view('emails.otp', ['code' => $data['code']])->render();
        $gmailService->sendEmailViaGmailApi($request->email, $htmlBody, 'Login OTP');
        
        // Mail::to($user->email)->send(new OtpMail($code));
        return (new UserResource($user))->additional(['status' => 'success', 'message' =>  trans('dashboard.auth.success_login')]);
    }

    public function verify(VerifyRequest $request)
    {
        $user = User::where(['reset_code' => $request->code, 'email' => $request->email])->whereIn('user_type', [User::SUPER_ADMIN, User::ADMIN])
            ->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')], 422));
            });

        DB::beginTransaction();
        try {
            $user->update(['reset_code' => null, 'phone_verified_at' => now(), 'otp_num' => 0]);
            $user->profile()->update(['last_login_at' => now()]);
            $token = JWTAuth::fromUser($user);
            data_set($user, 'token', $token);
            DB::commit();
            return response()->json(['status' => 'success', 'data' => new UserResource($user), 'message' => trans('app/client.auth.verify_sucess')]);
        } catch (Exception $e) {
            DB::rollback();
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function sendCode(SendCodeRequest $request)
    {
        $user = User::where(['email' => $request->email])->whereIn('user_type', [User::SUPER_ADMIN, User::ADMIN])->first();
        // $code = mt_rand(1111, 9999);
        $data['code'] = mt_rand(1111, 9999);
        if (!$user) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422);
        }
        if($user->otp_num >= 5) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'You have reached the maximum number of attempts. Please try again later.'], 422);
        }
        $user->update(['reset_code' => $data['code'], 'phone_verified_at' => null, 'otp_num' => $user->otp_num + 1]);

        $gmailService = new GmailService();
        $htmlBody = view('emails.otp', ['code' => $data['code']])->render();
        $gmailService->sendEmailViaGmailApi($request->email, $htmlBody, 'Login OTP');

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_send_successfully')]);
    }

    public function logout()
    {
        auth('api')->logout();
        return $this->successResponse(trans('dashboard.auth.success_logout'));
    }
}
