<?php

namespace App\Http\Requests\Api\Website\Contact;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
use Illuminate\Http\Exceptions\HttpResponseException;

class ContactRequest extends ApiMasterRequest
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

        return [
            "full_name"  => "required|string|between:2,250",
            "phone_code" => "required|exists:countries,phone_code",
            "phone"      => ["required", "digits:" . $country->phone_number_limit],
            "email"      => "nullable|email",
            "title"      => "nullable|string|between:2,250",
            "content"    => "required|string|between:2,10000",
            "user_id"    => "nullable|exists:users,id",
        ];
    }

    public function getValidatorInstance()
    {
        $data = $this->all();
        $user = auth("api")->user();
        if ($user != null) {
            $data["user_id"] = $user->id;
        }
        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
