<?php

namespace App\Http\Requests\Api\Dashboard\Admin\User;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Coupon;
use Illuminate\Http\Exceptions\HttpResponseException;

class SendCouponRequest extends ApiMasterRequest
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
        Coupon::where('code', $this->coupon_code)->available()->firstOr(function () {
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard/admin.messages.cant_send_this_coupon')], 422));
        });

        return [
            'coupon_code' => 'required'
        ];
    }
}
