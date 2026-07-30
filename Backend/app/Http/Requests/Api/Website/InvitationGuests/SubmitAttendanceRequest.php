<?php

namespace App\Http\Requests\Api\Website\InvitationGuests;

use App\Rules\ValidEmailDomain;
use Illuminate\Validation\Rule;
use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\InvitationGuests;
use App\Models\UserTemplate;

class SubmitAttendanceRequest extends ApiMasterRequest
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
        $required = $this->guest_token ? 'nullable' : 'required';
        $user_template = UserTemplate::where('code',$this->user_template_token)->firstOrFail();

        $check_phone = InvitationGuests::where(['user_template_id' => $user_template->id])->where('phone', $this->phone)->first();
        $check_email = InvitationGuests::where(['user_template_id' => $user_template->id])->where('email', $this->email)->first();

        return [
            'user_template_token'   => 'required|exists:user_templates,code',
            'answered_email'           => [
                'nullable',
                'email',
                new ValidEmailDomain,
            ],
            'guest_token'           => 'nullable|exists:invitation_guests,code',
            'name'                  => $required.'|between:2,180',
            'email'                 => ($check_email && !isset($this->guest_token)) ? [
                'nullable',
                'email',
                new ValidEmailDomain,
            ]:
            [
                'nullable',
                'email',
                new ValidEmailDomain,
                Rule::unique("invitation_guests")->where(function ($query) use($user_template){
                    return $query->where(['email' => request()->email, 'user_template_id' => $user_template->id]);
                })->ignore($this->id)
            ],
            'phone'                 => ($check_phone && !isset($this->guest_token)) ? 
                                    ["nullable", 'digits:9'] : 
                                    [
                                        "nullable",
                                        'digits:9',
                                        Rule::unique("invitation_guests")->where(function ($query) use($user_template){
                                            return $query->where(['phone' => request()->phone, 'user_template_id' => $user_template->id]);
                                        })->ignore($this->id)
                                    ],

            'is_attending'          => 'required|boolean',
            'host_token'            => 'nullable|exists:users,hash_code',
            'comment'               => 'nullable|string|max:1000',
            'number_of_invitees'    => 'nullable|numeric',
            'answers'               => 'nullable|array',
            'answers.*.question_id' => 'nullable|exists:questions,id',
            'answers.*.answer_id'   => 'nullable|array',
            'answers.*.answer_id.*' => 'nullable|exists:answers,id',
            'answers.*.answer'      => 'nullable',
        ];
    }
}
