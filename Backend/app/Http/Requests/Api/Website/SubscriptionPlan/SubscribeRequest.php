<?php

namespace App\Http\Requests\Api\Website\SubscriptionPlan;

use Illuminate\Validation\Rule;
use App\Http\Requests\Api\ApiMasterRequest;

class SubscribeRequest extends ApiMasterRequest
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
            'coupon'                            => 'nullable|exists:coupons,code',
            'is_company_data'                   => 'required|boolean',
            'company_name'                      => 'required_if:is_company_data,true|string',
            'company_address'                   => 'required_if:is_company_data,true|string',
            'company_vat_number'                => 'required_if:is_company_data,true',
            'company_email'                     => 'required_if:is_company_data,true|email|regex:/(.+)@(.+)\.(.+)/i',
        ];
    }
}
