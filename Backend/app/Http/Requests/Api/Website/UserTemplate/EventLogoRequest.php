<?php

namespace App\Http\Requests\Api\Website\UserTemplate;

use Carbon\Carbon;
use App\Http\Requests\Api\ApiMasterRequest;

class EventLogoRequest extends ApiMasterRequest
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

        $rules = [
            // 'user_template_id'      => 'required|exists:user_templates,id',
            'type'                  => 'required|string|in:logo,media,shapes,mask,intial',
            // 'logos'                 => 'required|array',
            'logo'                  => 'required|string',
        ];

        return $rules;
    }
}

