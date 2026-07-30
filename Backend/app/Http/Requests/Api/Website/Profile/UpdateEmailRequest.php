<?php

namespace App\Http\Requests\Api\Website\Profile;

use App\Models\User;
use App\Models\Country;
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateEmailRequest extends ApiMasterRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        if (auth()->user()->email == $this->email) {
            throw new HttpResponseException(response()->json([
                'status' => 'fail',
                'message' =>  trans('app/client.messages.please_change_new_email'),
                'data' => null,
            ], 422));
        }

        return [
            'email' => ["required", 'email', Rule::unique("users")->where(function ($query) {
                return $query->where(['email' => request()->email, "user_type" => User::CLIENT]);
            })],
        ];
    }
}
