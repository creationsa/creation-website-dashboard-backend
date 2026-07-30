<?php

namespace App\Http\Requests\Api\Website\Auth\Social;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Services\PhoneNumberService;

class VerifyRequest extends ApiMasterRequest
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
            'phone_code' => 'required|string|exists:countries,phone_code,deleted_at,NULL',
            'phone'      => 'required|numeric|exists:users,phone,phone_code,' .  $this->phone_code,
            'code'       => 'required',
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
