<?php

namespace App\Http\Resources\Api\Website\User;

use App\Http\Resources\Api\General\City\CityResource;
use App\Http\Resources\Api\General\Country\CountryResource;
use App\Http\Resources\Api\Website\Country\NationalityResource;
use App\Models\Country;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'id'                   => (int) $this->id,
            'full_name'            => (string) $this->full_name,
            'image'                => (string) $this->image,
            'email'                => (string) $this->email,
            // 'nationality'          => NationalityResource::make($this->country),
            // 'city'                 => CityResource::make($this->city),
            'country'              => CountryResource::make(Country::where('phone_code', $this->phone_code)->first()),
            'phone_code'           => (string) $this->phone_code,
            'phone'                => (string) $this->phone,
            'gender'               => (string) $this->gender,
            'points'               => (int) $this->points,
            'birthday'             => $this->profile?->birthday?->format('Y-m-d'),
            'phone_complete_form'  => (string) '+' . $this->phone_code . $this->phone,
            'unread_notifications' => (int) $this->unreadNotifications->count(),

            'lat'                  => (float) $this->default_address?->lat,
            'lng'                  => (float) $this->default_address?->lng,
            'location'             => (string) $this->default_address?->location,

            'locale'               => (string) $this->locale,
            'allow_notification'   => (bool) $this->profile?->allow_notification,

            'is_ban'               => (bool) $this->is_ban,
            'is_verify'            => (bool) $this->phone ? ($this->phone_verified_at != null) : true,
            'is_admin_active_user' => (bool) $this->is_admin_active_user,
            
            'is_social'            => $this->password == null ? true : false ,

            'token'                => $this->when($this->token, $this->token),
            'hash_code'            => $this->hash_code
        ];
    }
}
