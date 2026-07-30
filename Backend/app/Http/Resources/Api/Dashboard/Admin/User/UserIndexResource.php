<?php

namespace App\Http\Resources\Api\Dashboard\Admin\User;

use App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan\SubscriptionPlanResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $plan = $this->subscriptionPlanUsers()->where(['is_active' => true])->latest('id')->first();
        return [
            'id'                   => (int) $this->id,
            'full_name'            => $this->full_name,
            'image'                => $this->image,
            'email'                => $this->email,
            'phone'                => $this->phone,
            'phone_code'           => $this->phone_code,
            'phone_complete_form'  => $this->phone_code . $this->phone,
            'is_active'            => (bool) $this->is_active,
            'is_admin_active_user' => (bool) $this->is_admin_active_user,
            'is_ban'               => (bool) $this->is_ban,
            'points'               => $this->points,
            'subscription_plan'    => $plan ? SubscriptionPlanResource::make($plan->subscriptionPlan) : null,

        ];
    }
}
