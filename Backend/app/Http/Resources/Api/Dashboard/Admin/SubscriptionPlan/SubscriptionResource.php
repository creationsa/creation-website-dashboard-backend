<?php

namespace App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan;

use App\Http\Resources\Api\Dashboard\Admin\Coupon\CouponResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\User\UserIndexResource;
use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            'id'                    => (int) $this->id,
            'user'                  => UserIndexResource::make($this->user),
            'subscription_plan'     => SubscriptionPlanResource::make($this->subscriptionPlan),
            'transaction_id'        => (string) $this->transaction_id,
            'coupon'                =>  CouponResource::make($this->coupon),
            'price'                 => (float) $this->price,
            'vat_price'             => (float) $this->vat_price,
            'discount'              => (float) $this->discount,
            'discount_type'         => $this->discount_type,
            'total_price'           => (float) $this->total_price,
            'is_company_data'       => (bool) $this->is_company_data,
            'company_name'          => (string) $this->company_name,
            'company_address'       => (string) $this->company_address,
            'company_vat_number'    => (string) $this->company_vat_number,
            'company_email'         => (string) $this->company_email,
            'created_at'            => $this->created_at->format('Y-m-d'),
        ];
    }
}
