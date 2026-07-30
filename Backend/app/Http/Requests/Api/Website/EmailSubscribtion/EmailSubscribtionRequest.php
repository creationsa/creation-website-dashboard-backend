<?php

namespace App\Http\Requests\Api\Website\EmailSubscribtion;

use Illuminate\Validation\Rule;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EmailSubscribtionRequest extends ApiMasterRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "email"      =>
            [
                "required",
                "regex:/(.+)@(.+)\.(.+)/i",
                Rule::unique("email_subscribtions")->where(function ($query) {
                    return $query->where(['email' => request()->email]);
                })
            ],
        ];
    }

}
