<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Coupon;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $available = $this->start_at > now() || $this->end_at < now() || $this->used_num >= $this->max_used_num  || !$this->is_active ? false : true;
        return [
            'id'                 => (int) $this->id,
            'code'               => (string) $this->code,
            'start_at'           => $this->start_at ? $this->start_at->format('Y-m-d') : null,
            'end_at'             => $this->end_at ? $this->end_at->format('Y-m-d') : null,
            'start_time'           => $this->start_at ? $this->start_at->format('H:i') : null,
            'end_time'             => $this->end_at ? $this->end_at->format('H:i') : null,
            'is_active'          => (bool) $this->is_active,
            'available'          => (bool) $available,
            'discount_type'      => (string) $this->discount_type,
            'discount_amount'    => (double) $this->discount_amount,
            'max_discount'       => (int) $this->max_discount,
            'max_used_num'       => (int) $this->max_used_num,
            'max_used_for_user'  => (int) $this->max_used_for_user,
            'created_at'         => $this->created_at ? $this->created_at->format('Y-m-d') : null,
        ];
    }
}
