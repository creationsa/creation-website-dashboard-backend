<?php

namespace App\Http\Resources\Api\Dashboard\Admin\User;

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
        return [
            'id'                   => (int) $this->id,
            'full_name'            => $this->full_name,
            'image'                => $this->image,
            'email'                => $this->email,
            'phone'                => $this->phone,
            'phone_code'           => $this->phone_code,
            'phone_complete_form'  => $this->phone_code . $this->phone,
            'is_admin_active_user' => (bool) $this->is_admin_active_user,
            'is_ban'               => (bool) $this->is_ban,
            'user_type'            => (string) $this->user_type,
            'created_at'           => $this->created_at->format('Y-m-d H:i  '),
            'balance'              => (double) $this->wallet,
        ];
    }
}
