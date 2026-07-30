<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Contact;

use Illuminate\Http\Resources\Json\JsonResource;

class SimpleUserResource extends JsonResource
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
            'id'            => $this->id,
            'full_name'     => $this->full_name,
            'avatar'        => @$this->avatar,
            'phone_code'    => (int)$this->phone_code,
            'phone'         => (int)$this->phone,
            'email'         => $this->email,
            'user_type'     => $this->user_type,
        ];
    }
}
