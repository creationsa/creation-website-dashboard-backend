<?php

namespace App\Http\Resources\Api\General\City;

use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
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
            'id'          => (int) $this->id,
            'name'        => (string) $this->name,
            'short_name'  => (string) $this->short_name,
            'postal_code' => (string) $this->postal_code,
        ];
    }
}
