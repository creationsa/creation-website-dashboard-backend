<?php

namespace App\Http\Resources\Api\Dashboard\Admin\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserNamesResource extends JsonResource
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

        ];
    }
}
