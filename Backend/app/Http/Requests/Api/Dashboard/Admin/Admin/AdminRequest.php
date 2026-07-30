<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Admin;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
use App\Services\PhoneNumberService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class AdminRequest extends ApiMasterRequest
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
        $country = Country::wherePhoneCode($this->phone_code)->firstOr(function () {
            throw new HttpResponseException(response()->json(['stats' => "fail", "data" => null, "message" => trans('general.messages.the_phone_code_is_incorrect')], 422));
        });

        $status = isset($this->admin) ? "nullable" : "required";

        return [
            "image"           => "nullable|string",
            "full_name"       => "required|string|between:2,18|regex:/^[^0-9]*$/",
            "phone_code"      => "required|exists:countries,phone_code",
            "phone"           => ["required", 'digits:' . $country->phone_number_limit, Rule::unique("users")->where(function ($query) {
                return $query->where(['phone' => request()->phone, "phone_code" => request()->phone_code, "user_type" => 'admin']);
            })->ignore($this->admin)],
            'email'           => 'required|regex:/(.+)@(.+)\.(.+)/i|unique:users,email,'.$this->admin,
            "password"        => $status . "|min:6|confirmed",
            "gender"          => "nullable|in:male,female",
            "role_id"         => "required|exists:roles,id"
        ];
    }

    public function getValidatorInstance()
    {
        $data = $this->all();

        if (isset($data["phone"]) && $data["phone"]) {
            $data["phone"] = PhoneNumberService::validateIfPhoneStartWithZero($data["phone"]);
        }

        if (isset($data["phone_code"]) && strpos($data["phone_code"], "+") === 0) {
            $data["phone_code"] = substr($data["phone_code"], 1);
        }

        $data["user_type"]  = 'admin';

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
