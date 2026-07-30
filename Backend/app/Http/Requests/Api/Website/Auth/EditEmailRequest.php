<?php

namespace App\Http\Requests\Api\Website\Auth;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class EditEmailRequest extends ApiMasterRequest
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
            "email"        => [
                "required", "regex:/(.+)@(.+)\.(.+)/i",
                Rule::unique("users")->ignore(auth('api')->id())->where(function ($query) {
                    return $query->where(['email' => request()->email, "user_type" => "client"]);
                })
            ],
        ];
    }
}
