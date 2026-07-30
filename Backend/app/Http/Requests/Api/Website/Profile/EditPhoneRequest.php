<?php

namespace App\Http\Requests\Api\Website\Profile;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
use App\Services\PhoneNumberService;
use Illuminate\Validation\Rule;

class EditPhoneRequest extends ApiMasterRequest
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
            "phone_code" => "required|string|exists:countries,phone_code",
            "phone"      => [
                'required',
                'numeric',
                'digits:' . Country::where('phone_code', $this->phone_code)->first()?->phone_number_limit,
                Rule::unique('users', 'phone')->where('phone_code', $this->phone_code)->ignore(auth('api')->id())
            ],
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
