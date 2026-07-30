<?php

namespace App\Http\Controllers\Api\Website\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Website\Auth\Social\{AddPhoneRequest, SocialLoginRequest, VerifyRequest};
use App\Http\Resources\Api\Website\User\ProfileResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class SocialLoginController extends Controller
{
    public function social(SocialLoginRequest $request)
    {
        $user = User::whereHas('social', function ($query) use ($request) {
            $query->where(['provider_type' => $request->provider_type, 'provider_id' => $request->provider_id]);
        })->first();

        try {
            $user = User::firstOrCreate(
                ['email' => $request->email],
                [
                    'user_type' => 'client',
                    'full_name' => $request->full_name,
                    'hash_code' => generate_unique_code(8, '\\App\\Models\\User', 'hash_code', 'letters'),
                    'phone_verified_at' => now(),
                    'points' => 25
                ]
            );

            // Create or update social login details
            $user->social()->updateOrCreate(
                ['provider_type' => $request->provider_type],
                ['provider_id' => $request->provider_id]
            );

            // Create or update profile if lat/lng/desc provided
            if ($request->has(['lat', 'lng', 'desc'])) {
                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    array_only($request->validated(), ['lat', 'lng', 'desc'])
                );
            }

            if ($request->type && $request->device_token) {
                $user->devices()->firstOrCreate($request->only(['type', 'device_token']));
            }

            $token = JWTAuth::fromUser($user->fresh());
            data_set($user, 'token', $token);

            return (new ProfileResource($user))->additional(['status' => 'success', 'message' => trans('app/client.auth.login_sucess')]);
        } catch (Exception $e) {
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function addPhone(AddPhoneRequest $request)
    {
        $user = User::whereHas('social')->findOr(auth()->id(), function () {
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.user_not_found')], 422));
        });

        $code = mt_rand(1111, 9999);
        //TODO send opt

        $user->update(['phone' => $request->phone, 'phone_code' => $request->phone_code, 'reset_code' => $code]);

        $token = JWTAuth::fromUser($user->fresh());
        data_set($user, 'token', $token);

        return (new ProfileResource($user))->additional(['status' => 'success', 'message' => trans('app/client.auth.added_sucess')]);
    }

    public function verify(VerifyRequest $request)
    {
        $user = User::whereHas('social')->where(['reset_code' => $request->code, 'phone' => $request->phone, 'phone_code' => $request->phone_code, 'user_type' => 'client'])
            ->whereNull('phone_verified_at')->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')], 422));
            });

        DB::beginTransaction();
        try {
            $user->update(['reset_code' => null, 'phone_verified_at' => now()]);
            $token = JWTAuth::fromUser($user->fresh());
            data_set($user, 'token', $token);
            DB::commit();
            return response()->json(['status' => 'success', 'data' => new ProfileResource($user), 'message' => trans('app/client.auth.verify_sucess')]);
        } catch (Exception $e) {
            DB::rollback();
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }
}
