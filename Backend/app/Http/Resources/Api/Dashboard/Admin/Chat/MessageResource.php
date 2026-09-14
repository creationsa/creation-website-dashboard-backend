<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Chat;

use App\Http\Resources\Api\App\User\UserItemResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'id'           => (int) $this->id,
            'user'         => UserItemResource::make($this->user),
            'message'      => $this->message,
            'message_type' => $this->message_type,
            'created_at'   => $this->created_at->timestamp
        ];
    }
}
