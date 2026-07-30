<?php

namespace App\Http\Requests\Api\Website\InvitationGuests;

use App\Rules\ValidEmailDomain;
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;

class NewGuestRequest extends ApiMasterRequest
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
            'name'                  => 'required|string|between:2,180',
            'email'                 => ['nullable', 'email', new ValidEmailDomain  ,
                                            Rule::unique("invitation_guests")->where(function ($query) {
                                                return $query->where(['email' => request()->email, 'user_template_id' => $this->user_template_id]);
                                            })->ignore($this->id)
                                        ],
            'phone'                 => ["nullable", 'digits:9', Rule::unique("invitation_guests")->where(function ($query) {
                return $query->where(['phone' => request()->phone, 'user_template_id' => $this->user_template_id]);
            })->ignore($this->id)],
            // 'nullable|unique:invitation_guests,phone,NULL,id,user_template_id,' .  $this->user_template_id . '|digits:9',
            'number_of_invitees'    => 'nullable|numeric',
            'personal_note'    => 'nullable|string|max:1000',
        ];
    }

    public function getValidatorInstance()
    {
        $data = $this->all();

        if (isset($data['phone']) && $data['phone']) {
            $data['phone'] = PhoneNumberService::validateIfPhoneStartWithZero($data['phone']);
        }

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
