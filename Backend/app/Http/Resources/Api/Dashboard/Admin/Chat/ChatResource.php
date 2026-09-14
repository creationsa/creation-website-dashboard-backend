<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Chat;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
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
            'id'                 => (int) $this->id,
            'active_user_number' => (int) $this->active_user_number,
        ];
    }
}
