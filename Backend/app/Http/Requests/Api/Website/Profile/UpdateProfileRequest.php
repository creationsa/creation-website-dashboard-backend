<?php

namespace App\Http\Requests\Api\Website\Profile;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends ApiMasterRequest
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
            'image'     => 'nullable|string',
            'full_name' => 'nullable|string|min:2',
            'phone_code'   => 'required|string|exists:countries,phone_code',
            'phone'     => [
                'required',
                Rule::unique('users')->where(function ($query) {
                    return $query->where(['phone' => request()->phone, 'user_type' => 'client']);
                })->ignore(auth('api')->id())
            ],
        ];
    }
}
