<?php

namespace App\Http\Requests\Api\Website\Profile;

use App\Models\User;
use App\Models\Country;
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class VerifyCodeRequest extends ApiMasterRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {

        return [
            'email' =>["required", 'email', Rule::unique("users")->where(function ($query) {
                return $query->where(['email' => request()->email, "user_type" => User::CLIENT]);
            })],
            "code" => "required"
        ];
    }

}
