<?php

namespace App\Http\Requests\Api\Dashboard\Admin\User;

use App\Models\{Country, User};
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DriverRequest extends ApiMasterRequest
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
            "user_type"  => 'nullable',
            "image"      => "nullable|string",
            'full_name'  => 'required|string|between:2,18|regex:/^[\p{Arabic}a-zA-Z\s\-\'\.]+$/u',
            'email'      => ['nullable', 'email', 'regex:/^\\S+@\\S+\\.\\S+$/', 'regex:/(.+)@(.+)\.(.+)/i', Rule::unique("users")->where(function ($query) {
                return $query->where(['email' => request()->email, 'deleted_at' => null]);
            })->ignore($this->user)],
            "phone_code" => "required|exists:countries,phone_code",
            "phone"      => ["required", 'digits:' . $country->phone_number_limit, Rule::unique("users")->where(function ($query) {
                return $query->where(['phone' => request()->phone, "phone_code" => request()->phone_code, 'deleted_at' => null]);
            })->ignore($this->user)],
            "password"   => $status . "|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/",
            "country_id" => "nullable|exists:countries,id",
            "city_id"    => "required_if:user_type,driver|exists:cities,id",
            'birhdate'     => 'required|date_format:Y-m-d',
            'contract'   => 'required|string',
            'added_by'   => 'required|in:admin,agent',
            'is_special_driver' => 'required|boolean',
            'national_id'   => 'required|digits:14|numeric',

            'lat'        => 'nullable|numeric',
            'lng'        => 'nullable|numeric',
            'location'   => 'nullable|string|between:3,250',

            'driver_data'       => 'nullable',
            'profile_data'      => 'nullable',

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
        $driver_data = [
            'national_id'       => isset($data['national_id']) && $data['national_id'] != null ? $data['national_id'] : null,
            
        ];
        $data['driver_data'] = $driver_data;
        $data['profile_data'] = [
            'lat'      => isset($data['lat']) && $data['lat'] != null ? $data['lat'] : null,
            'lng'      => isset($data['lng']) && $data['lng'] != null ? $data['lng'] : null,
            'location' => isset($data['location']) && $data['location'] != null ? $data['location'] : null,
            'country_id' => isset($data['country_id']) && $data['country_id'] != null ? $data['country_id'] : null,
        ];
        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
