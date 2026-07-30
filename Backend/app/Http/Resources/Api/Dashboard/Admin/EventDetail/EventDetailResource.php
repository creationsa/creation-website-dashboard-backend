<?php

namespace App\Http\Resources\Api\Dashboard\Admin\EventDetail;

use Illuminate\Http\Resources\Json\JsonResource;

class EventDetailResource extends JsonResource
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
            'id'          => $this->id,
            'user_name'   => $this->user_name,
            'phone'       => $this->phone,
            'invited_number'  => $this->invited_number,
            'event_date'   => $this->event_date ? $this->event_date->format('Y-m-d') : null,
        ];
    }
}
