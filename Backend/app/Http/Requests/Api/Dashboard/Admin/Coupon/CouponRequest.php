<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Coupon;

use App\Http\Requests\Api\ApiMasterRequest;
use Ramsey\Uuid\Type\Integer;

class CouponRequest extends ApiMasterRequest
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
     * @return array
     */
    public function rules()
    {
        $status = isset($this->coupon) ? 'nullable' : 'required';
        $startAT = 'required|date_format:Y-m-d H:i|after:yesterday';
        if ($this->coupon) {
            $startAT = 'nullable|date';
        }
        $rules = [
            'code'              => $status . '|string|unique:coupons,code,' . $this->coupon,
            'start_at'          =>   $startAT,
            'end_at'            => $status . '|date_format:Y-m-d H:i|after:start_at',
            'is_active'         => 'nullable|in:boolean',
            'discount_type'     => $status . '|in:value,percentage',
            'discount_amount'   => $status . '|numeric',
            'max_discount'      => 'nullable|numeric',
            'max_used_num'      => 'required|numeric|min:1',
            'max_used_for_user' => 'nullable|numeric|max:'.$this->max_used_num
            
        ];

        return $rules;
    }
    
}
