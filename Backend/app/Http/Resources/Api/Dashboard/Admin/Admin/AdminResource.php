<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Admin;

use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Role\RoleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
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
            'image'                => $this->image_object,
            'email'                => (string) $this->email,
            'phone'                => (string) $this->phone,
            'phone_code'           => (string) $this->phone_code,
            'country'              => new CountryItemResource($this->country),
            'phone_complete_form'  => (string) $this->phone_code . $this->phone,
            'is_admin_active_user' => (bool) $this->is_admin_active_user,
            'role'                 => RoleResource::make($this->role),
            'created_at'           => $this->created_at?->format('Y-m-d')
        ];
    }
}
