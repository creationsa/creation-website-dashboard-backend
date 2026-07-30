<?php

namespace App\Http\Requests\Api\Website\Auth;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Services\PhoneNumberService;

class LoginByPhoneRequest extends ApiMasterRequest
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
            'phone_code' => 'required|string|exists:countries,phone_code',
            'phone'      => 'required|string',
            'password'   => 'required|min:8',
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
