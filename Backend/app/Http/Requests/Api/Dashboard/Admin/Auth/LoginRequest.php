<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Auth;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends ApiMasterRequest
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
            'email' => [
                'required',
                Rule::exists('users')->where(function ($query) {
                    return $query->whereIn('user_type', ['super_admin', 'admin']);
                }),
            ],
            'password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.exists' => trans('Invalid credentials'),
        ];
    }
}
