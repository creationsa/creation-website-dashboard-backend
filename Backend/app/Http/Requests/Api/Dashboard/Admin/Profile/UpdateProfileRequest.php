<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Profile;

use App\Models\Country;
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProfileRequest extends ApiMasterRequest
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
            throw new HttpResponseException(response()->json([
                'status' => 'fail',
                'message' =>  trans('dashboard/admin.auth.phone_country_is_required'),
                'data' => null,
            ], 422));
        });

        // $this->merge(['country_id' =>  $country->id]);

        return [
            "image"      => "nullable|string",
            "full_name"  => "required|string|between:3,100",
            "email"      => "required|regex:/(.+)@(.+)\.(.+)/i|unique:users,email," . auth("api")->id(),
            "phone_code" => "nullable|exists:countries,phone_code",
            "phone"      => [
                "nullable", $country != null ? "digits:" . $country->phone_number_limit : "", Rule::unique("users")->where(function ($query) {
                    return $query->where(["phone" => request()->phone, "phone_code" => request()->phone_code, "user_type" => auth("api")->user()->user_type]);
                })->ignore(auth("api")->id(), "id")
            ],
            "current_password" => [
                "required_with:password", function ($attribute, $value, $fail) {
                    if (!Hash::check($value, auth('api')->user()->password)) {
                        $fail(trans("validation.invalid_current_password"));
                    }
                }
            ],
            "password" => "nullable|min:6|string",
            "gender"   => "nullable|in:male,female",
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

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
