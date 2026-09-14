<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Client;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Rules\SvgFile;

class ClientRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',

            'logos' => 'required|array|min:1',
            'logos.*.logo_image' => ['nullable', 'string', new SvgFile()],
            'logos.*.alt_en' => 'required|string|max:255',
            'logos.*.alt_ar' => 'required|string|max:255',
        ];
    }
}
