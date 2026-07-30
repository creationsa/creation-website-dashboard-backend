<?php

namespace App\Http\Requests\Api\Website\UserTemplate;

use Carbon\Carbon;
use App\Http\Requests\Api\ApiMasterRequest;

class TemplateSettingRequest extends ApiMasterRequest
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
            'close_landing'                 => 'nullable|boolean',
            'landing_duration'              => 'nullable|numeric|min:1',
            // 'reminder_attended_duration'    => 'required|numeric|min:1',
            // 'reminder_not_attended_duration' => 'required|numeric|min:1',
            'message_gender'                 => 'required|string|in:male,female,both',
            'send_whatsapp'                  => 'required|boolean',
            'send_sms'                       => 'required|boolean',
            'send_email'                     => 'required|boolean',
        ];

        return $rules;
    }
}
