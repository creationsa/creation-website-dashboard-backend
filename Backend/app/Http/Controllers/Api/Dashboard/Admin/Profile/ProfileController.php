<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Profile\UpdateProfileRequest;
use App\Http\Resources\Api\Dashboard\Admin\Auth\UserResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    public function profile()
    {
        return UserResource::make(auth('api')->user())->additional(['status' => 'success', 'message' => '']);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = auth("api")->user();
        $user->update($request->validated());

        if ($request->current_password && $request->password)
        {
            $user->profile()->updateOrCreate(['user_id' => $user->id], ['allow_session_from' => now()]);
        }

        return (new UserResource($user->fresh()))->additional(['status' => 'success', 'message' =>  trans('dashboard/admin.auth.success_update')]);
    }
}
