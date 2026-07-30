<?php

namespace App\Http\Resources\Api\Dashboard\Admin\User;

use App\Models\OrderPrice;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\App\Client\Address\AddressResource;
use App\Http\Resources\Api\Dashboard\Admin\Contact\ContactResource;
use App\Http\Resources\Api\Dashboard\Admin\Order\{OrderIndexResource};
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\UserClass\UserClassResource;
use App\Http\Resources\Api\App\Client\Prescription\PrescriptionResource;
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryIndexResource;
use App\Http\Resources\Api\App\Client\Prescription\ClientPrescriptionResource;
use App\Http\Resources\Api\Dashboard\Admin\Contact\ContactWithRepliesResource;
use App\Http\Resources\Api\Dashboard\Admin\ReviewProduct\ReviewProductResource;
use App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan\SubscriptionPlanResource;

class UserResource extends JsonResource
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
            'id'                   => $this->id,
            'full_name'            => $this->full_name,
            'image'                => $this->image,
            'email'                => $this->email,
            'phone'                => $this->phone,
            'phone_code'           => $this->phone_code,
            'country'              => new CountryItemResource($this->profile?->country),
            'phone_complete_form'  => $this->phone_code . $this->phone,
            'is_active'            => (bool) $this->is_active,
            'is_ban'            => (bool) $this->is_ban,
            'locale'               => (string) $this->locale,
            // 'referral_code'        => $this->referral_code,
            'unread_notifications' => (int) $this->unreadNotifications->count(),
            'allow_notifications'  => (bool) $this->allow_notifications,
            'is_admin_active_user' => (bool) $this->is_admin_active_user,

            'points'               => $this->points,
            'subscription_plan'    => $plan ? SubscriptionPlanResource::make($plan->subscriptionPlan) : null,

            'created_at'           => $this->created_at?->format('Y-m-d')
        ];
    }
}
