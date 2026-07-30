<?php

namespace App\Http\Requests\Api\Dashboard\Admin\User;

use App\Models\{Country, User};
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends ApiMasterRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $country = Country::wherePhoneCode($this->phone_code)->first();
        
        if (!$country) {
            throw new HttpResponseException(response()->json([
                'status'  => 'fail',
                'data'    => null,
                'message' =>  trans('Invalid phone code'),
            ], 422));
        }

        $this->merge(['country_id' => $country->id]);

        $status = isset($this->user) ? 'nullable' : 'required';

        return [
            "image"           => "nullable|string",
            'full_name'       => 'required|string|between:2,180|regex:/^[^0-9]*$/',
            'email'           => 'required|email|regex:/^\\S+@\\S+\\.\\S+$/|regex:/(.+)@(.+)\.(.+)/i|unique:users,email,' . $this->user,
            "phone_code"      => "required|exists:countries,phone_code",
            "phone"           => ["required", 'digits:' . $country->phone_number_limit, Rule::unique("users")->where(function ($query) {
                return $query->where(['phone' => request()->phone, "phone_code" => request()->phone_code, "user_type" => 'client']);
            })->ignore($this->user)],
            "password"        => $status . "|min:6|confirmed",
            "country_id"      => "nullable|exists:countries,id",

        ];
    }

    public function getValidatorInstance()
    {
        $data = $this->all();

        if (isset($data['phone']) && $data['phone']) {
            $data['phone'] = PhoneNumberService::validateIfPhoneStartWithZero($data['phone']);
        }

        if (isset($data['phone_code']) && strpos($data['phone_code'], '+') === 0) {
            $data['phone_code'] = substr($data['phone_code'], 1);
        }

        $data['user_type']  = 'client';
        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
