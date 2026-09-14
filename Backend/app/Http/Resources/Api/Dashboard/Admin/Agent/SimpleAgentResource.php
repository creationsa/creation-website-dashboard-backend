<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Agent;

use Illuminate\Http\Resources\Json\JsonResource;

class SimpleAgentResource extends JsonResource
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
            'total_drivers'        => /*(int) $this->drivers->count() */ 0,
            'total_orders'         => /*(int) $this->orders->count() ?? 0*/ 0,
        ];
    }
}
