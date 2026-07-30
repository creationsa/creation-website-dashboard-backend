<?php

namespace App\Http\Controllers\Api\Website\Profile;

use Exception;
use App\Models\{User, Email, Device, EditPhone};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Resources\Api\Website\User\ProfileResource;
use App\Http\Requests\Api\Website\Profile\{ChangeLanguageRequest, CheckCodeRequest, EditPhoneRequest, UpdateLocationRequest, UpdatePasswordRequest, UpdatePhoneRequest, UpdateProfileRequest, MedicalFileRequest, VerifyCodeRequest, UpdateEmailRequest};

class ProfileController extends Controller
{
    public function profile()
    {
        $user = auth('api')->user();
        $token = JWTAuth::fromUser($user);
        data_set($user, 'token', $token);
        return ProfileResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = auth('api')->user();
        $user->update($request->validated());
        return (new ProfileResource($user->fresh()))->additional(['status' => 'success', 'message' => trans('app/client.messages.edited_successfully')]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = auth('api')->user();
        $user->update(['password' => $request->new_password]);
        return (new ProfileResource($user->fresh()))->additional(['status' => 'success', 'message' => trans('app/client.auth.success_change_password')]);
    }

    public function updateEmail(UpdateEmailRequest $request)
    {
        if (User::clientExistsInDB($request->email)->first()) {
            return $this->errorResponse(trans(('app/client.messages.email_used_before')));
        }
        $user = auth('api')->user();
        try {
            $code = mt_rand(1111, 9999);
            if (setting('use_sms_service') == 'enable') {
                $code = mt_rand(1111, 9999);
                // send_sms($request->phone, ['code' => $code]);
            }

            $phone = Email::UpdateOrCreate(
                ['user_id' => auth('api')->id()],
                ['email' => $request->email, 'code' => $code, 'user_id' => auth('api')->id()]
            );
            return response()->json([
                'status' => 'success',
                'data' => null,
                'message' => trans('app/client.messages.verified_code_send_successfully')
            ]);
        } catch (Exception $e) {
            info($e->getMessage());
            return response()->json([
                'status' => 'fail',
                'data' => null,
                'message' => trans('app/client.messages.something_went_wrong_please_try_again')
            ], 422);
        }
    }

    public function verifyEmail(VerifyCodeRequest $request)
    {
        $email = Email::where([
            'email' => $request->email,
            'code' => $request->code,
        ])->firstOr(function () {
            throw new HttpResponseException(response()->json([
                'status' => 'fail',
                'message' =>  trans('app/client.messages.code_not_true'),
                'data' => null,
            ], 422));
        });

        DB::beginTransaction();
        try {
            auth('api')->user()->update(['email' => $request->email]);
            $email->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
            return  $this->errorResponse(trans('app/client.messages.something_went_wrong_please_try_again'));
        }
        return response()->json(['status' => 'success', 'data' => new ProfileResource(auth('api')->user()->fresh()), 'message' => trans('app/client.messages.phone_updated_successfully')]);
    }

    public function checkCode(CheckCodeRequest $request)
    {
        $phone_verified = Email::where(['email' => $request->email, 'code' => $request->code])->first();

        if ($phone_verified && $phone_verified->code == $request->code) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.auth.code_is_true')]);
        } else {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.auth.code_is_not_true')], 422);
        }
    }

    public function changeLanguage(ChangeLanguageRequest $request)
    {
        $user = auth('api')->user();
        try {
            $user->update($request->validated());
            $user->refresh();
            return response()->json(['status' => 'success', 'data' => ['locale' =>  (string) $user->locale], 'message' => trans('app/client.messages.edited_successfully')]);
        } catch (Exception $e) {
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function updateLocation(UpdateLocationRequest $request)
    {
        $user = auth('api')->user();
        try {
            $user->profile()->update($request->validated());
            return (new ProfileResource($user->fresh()))->additional(['status' => 'success', 'message' => trans('app/client.auth.update_phone_success')]);
        } catch (Exception $e) {
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function toggleNotification()
    {
        $user = auth('api')->user();
        $user->profile()->update(['allow_notification' => !$user->profile->allow_notification]);
        return (new ProfileResource($user->fresh()))->additional(['status' => 'success', 'message' => '']);
    }

    public function deleteAccount()
    {
        $user = auth('api')->user();
        $user->delete();
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.messages.deleted_successfully')]);
    }

    public function updateFcm(Request $request)
    {
        Device::updateOrCreate(['user_id' => auth('api')->id(), 'type' => $request->type], ['device_token' => $request->device_token]);
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard.messages.success_update')]);
    }

    public function medicalFile(MedicalFileRequest $request)
    {
        $user = auth('api')->user();
        $user->update(['gender' => $request->gender]);
        $user->profile()->update(array_except($request->validated(), ['diseases', 'gender']));
        $user->diseases()->sync($request->diseases);
        return response()->json(['status' => 'success', 'data' => ProfileResource::make($user), 'message' => trans('app/client.messages.success_edit')]);
    }
}
