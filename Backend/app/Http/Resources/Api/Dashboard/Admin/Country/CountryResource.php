<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Country;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
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
            'id'                 => $this->id,
            'name'               => $this->name,
            'phone_code'         => $this->phone_code,
            'phone_number_limit' => $this->phone_number_limit,
            'national_id_limit'  => $this->national_id_limit,
            'flag'               => $this->flag,
            'short_name'         => $this->short_name,
            'is_active'          => (bool) $this->is_active,
        ];
    }
}
