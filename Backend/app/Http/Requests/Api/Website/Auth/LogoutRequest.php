<?php

namespace App\Http\Requests\Api\Website\Auth;

use App\Http\Requests\Api\ApiMasterRequest;

class LogoutRequest extends ApiMasterRequest
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
            'type'         => 'nullable|in:ios,android,huawei',
            'device_token' => 'nullable',
        ];
    }
}
