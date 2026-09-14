<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Country;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryItemResource extends JsonResource
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
            'id'         => $this->id,
            'name'       => $this->name,
            'short_name' => $this->short_name,
            'phone_code' => $this->phone_code,
            'phone_number_limit' => $this->phone_number_limit,
            'flag'       => $this->flag,
            'is_active'  => (bool) $this->is_active,
        ];
    }
}
