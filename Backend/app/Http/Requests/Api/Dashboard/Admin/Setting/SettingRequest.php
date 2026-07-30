<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Setting;


use App\Http\Requests\Api\ApiMasterRequest;

class SettingRequest extends ApiMasterRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'phone'     => "nullable|numeric",
            'email'     => "nullable|string",
            'facebook'  => "nullable|url",
            'twitter'   => "nullable|url",
            'youtube'   => "nullable|url",
            'instagram' => "nullable|url",
            'whatsapp'  => "nullable|string|max:250",

            'years_experience'        => "nullable|numeric|min:0",
            'numbers_employee'        => "nullable|numeric|min:0",
            'numbers_drivers'         => "nullable|numeric|min:0",
            'numbers_companies'       => "nullable|numeric|min:0",
            'numbers_completed_order' => "nullable|numeric|min:0",
        ];
    }
}
