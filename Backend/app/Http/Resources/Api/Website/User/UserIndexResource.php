<?php

namespace App\Http\Resources\Api\Website\User;

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
            'id'        => (int) $this->id,
            'full_name' => (string) $this->full_name,
            'email'     => (string) $this->email,
            'image'     => (string) $this->image,
        ];
    }
}
