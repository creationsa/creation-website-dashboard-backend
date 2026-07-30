<?php

namespace App\Http\Requests\Api\Website\Cohost;

use Illuminate\Validation\Rule;
use App\Http\Requests\Api\ApiMasterRequest;

class CohostRequest extends ApiMasterRequest
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
        $phone_required = $this->email &&  $this->email != '' ? 'nullable': 'required';
        $email_required = $this->phone &&  $this->phone != '' ? 'nullable' : 'required';
        return [
            'image'                     => 'nullable|string',
            'name'                      => 'required|between:2,180',
            'email'                     => 
                [
                    $email_required ,'email','regex:/(.+)@(.+)\.(.+)/i',
                    Rule::unique("cohosts")->ignore($this->cohost)->where(function ($query) {
                        return $query->where(['email' => request()->email, "user_template_id" => $this->user_template_id]);
                    })
                ],
            'phone'                 => 
                [
                    $phone_required , 'digits:9',
                    Rule::unique("cohosts")->where(function ($query) {
                        return $query->where(['phone' => request()->phone, 'user_template_id' => $this->user_template_id]);
                    })->ignore($this->cohost)
                ],

            'unlimited_guests'          => 'required|boolean',
            'number_of_guests'          => 'required_if:unlimited_guests,false|min:0|max:50000',
            'allow_customize_events'    => 'required|boolean',
            'allow_track_guests'        => 'required|boolean',
            'is_active'                 => 'required|boolean',
            // 'user_template_ids'         => 'required|array',
            'user_template_id'          => 'required|exists:user_templates,id',
        ];
    }
}
