<?php

namespace App\Http\Requests\Api\General\EventDetail;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
use Illuminate\Http\Exceptions\HttpResponseException;

class EventDetailRequest extends ApiMasterRequest
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
        // $country = Country::wherePhoneCode($this->phone_code)->firstOr(function () {
        //     throw new HttpResponseException(response()->json(['stats' => "fail", "data" => null, "message" => trans('general.messages.the_phone_code_is_incorrect')], 422));
        // });

        return [
            "user_name"  => "required|string|between:2,250",
            // "phone_code" => "required|exists:countries,phone_code",
            "phone"      => ["required", "string", "between:4,20",
                             "regex:/^\+?[0-9]{4,20}$/"],
            "invited_number"      => "required|numeric|min:1",
            "event_date"      => "nullable|string|date_format:Y-m-d",
            "user_id"    => "nullable",
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
