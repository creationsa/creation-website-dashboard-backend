<?php

namespace App\Http\Requests\Api\Website\InvitationGuests;

use App\Http\Requests\Api\ApiMasterRequest;

class InvitationGuestsRequest extends ApiMasterRequest
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
            'user_template_id'      => 'required|exists:user_templates,id',
            'name'                  => 'required|between:2,180',
            'email'                 => 'nullable',
            'phone'                 => 'nullable',
            'is_attending'          => 'required|boolean',
            'number_of_invitees'    => 'nullable|numeric',
            'answers'               => 'nullable|array',
            'answers.*.question_id' => 'nullable|exists:questions,id',
            'answers.*.answer_id'   => 'nullable|array',
            'answers.*.answer_id.*' => 'nullable|exists:answers,id',
            'answers.*.answer'      => 'nullable',
        ];
    }
}
