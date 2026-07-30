<?php

namespace App\Http\Resources\Api\Dashboard\Admin\EmailSubscribtion;

use Illuminate\Http\Resources\Json\JsonResource;

class EmailSubscribtionResource extends JsonResource
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
            'status'      => $this->status,
            'email'       => $this->email,
            'created_at'  => $this->created_at ? $this->created_at->format('Y-m-d') : null,
        ];
    }
}
