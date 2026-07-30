<?php

namespace App\Http\Requests\Api\Website\Auth;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
use App\Services\PhoneNumberService;
use Illuminate\Validation\Rule;

class RegisterRequest extends ApiMasterRequest
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
            'full_name'    => 'required|string|between:2,255',
            "email"        => [
                "required", "regex:/(.+)@(.+)\.(.+)/i",
                Rule::unique("users")->where(function ($query) {
                    return $query->where(['email' => request()->email, "user_type" => "client"]);
                })
            ],
            'phone_code'   => 'required|string|exists:countries,phone_code',
            'phone'        => 'required|numeric|unique:users,phone,NULL,id,phone_code,' .  $this->phone_code . '|digits:' . Country::where('phone_code', $this->phone_code)->first()?->phone_number_limit,
            'password'     => 'required|min:8|confirmed',
            'lat'          => 'nullable|numeric',
            'lng'          => 'nullable|numeric',
            'location'     => 'nullable|string|between:3,250',
            'profile_data' => 'nullable',
        ];
    }

        public function getValidatorInstance()
        {
            $data = $this->all();

            if (isset($data['phone']) && $data['phone']) {
                $data['phone'] = PhoneNumberService::validateIfPhoneStartWithZero($data['phone']);
            }

            $profile_data = [
                'lat'      => isset($data['lat']) && $data['lat'] != null ? $data['lat'] : null,
                'lng'      => isset($data['lng']) && $data['lng'] != null ? $data['lng'] : null,
                'location' => isset($data['location']) && $data['location'] != null ? $data['location'] : null,
            ];

            $data['profile_data'] = $profile_data;

            $this->getInputSource()->replace($data);
            return parent::getValidatorInstance();
        }
}
