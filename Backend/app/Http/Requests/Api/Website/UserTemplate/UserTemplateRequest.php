<?php

namespace App\Http\Requests\Api\Website\UserTemplate;

use Carbon\Carbon;
use App\Http\Requests\Api\ApiMasterRequest;

class UserTemplateRequest extends ApiMasterRequest
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
        //$current_time = Carbon::now()->format('H:i');
        $current_date = Carbon::now()->format('Y-m-d');

        $routeName = request()->route()->getName();

        // Set the default rules
        $rules = [
            'design'                => 'required',
            'locale'                => 'nullable|string|in:en,ar',
            'show_qr'               => 'nullable|boolean',
            'logos'                 => 'nullable|array',
            'logos.*'               => 'nullable|string',
            'name'                  => 'nullable|string|between:2,180',
            'title'                 => 'nullable|string|between:2,180',
            'desc'                  => 'nullable|string|between:2,1000',
            'show_guest_list'       => 'nullable|boolean',
            'location'              => 'nullable',
            'location_name'         => 'nullable|string',
            'address'               => 'nullable|string|between:2,180',
            'questions'             => 'nullable|array',
            'questions.*.title'     => 'nullable|string',
            'questions.*.type'      => 'nullable|in:short,checkboxes,multiple|string',
            'questions.*.answers'   => 'nullable|array|required_if:questions.*.type,checkboxes,multiple',
            'date'            => 'nullable|date_format:Y-m-d|after_or_equal:' . $current_date,
            'time'            => 'nullable|date_format:H:i',
            'reminder_attended_duration'    => 'nullable|numeric|min:1',
            'reminder_not_attended_duration' => 'nullable|numeric|min:1',
        ];

        if ($routeName !== 'user_templates.update') {
            $rules['template_id'] = 'required|exists:templates,id';
        }

        return $rules;
    }
}

