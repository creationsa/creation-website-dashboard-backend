<?php

namespace App\Http\Requests\Api\Website\Profile;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Services\PhoneNumberService;

class UpdatePhoneRequest extends ApiMasterRequest
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
            "phone"      => "required|numeric|unique:users,phone," . auth('api')->id() . ',id,phone_code,' .  $this->phone_code,
            "code"       => "required|numeric",
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
