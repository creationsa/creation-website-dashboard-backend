<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Setting;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Rules\SvgFile;

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
            'logo_en.media' => ['nullable', 'string', new SvgFile()],
            'logo_en.en.alt' => 'nullable|string|between:3,100',
            'logo_en.ar.alt' => 'nullable|string|between:3,100',

            'logo_ar.media' => ['nullable', 'string', new SvgFile()],
            'logo_ar.en.alt' => 'nullable|string|between:3,100',
            'logo_ar.ar.alt' => 'nullable|string|between:3,100',

            'socials' => 'required|array|min:1',
            'socials.*.id' => 'nullable|integer|exists:setting_socials,id',
            'socials.*.title_en' => 'required|string|between:3,100',
            'socials.*.title_ar' => 'required|string|between:3,100',
            'socials.*.link' => 'required|string|max:255',
        ];
    }
}
