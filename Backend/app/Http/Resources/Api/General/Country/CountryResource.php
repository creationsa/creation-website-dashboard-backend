<?php

namespace App\Http\Resources\Api\General\Country;

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
            'id'                 => (int) $this->id,
            'name'               => (string) $this->name,
            'nationality'        => (string) $this->nationality,
            'phone_code'         => (string) $this->phone_code,
            'show_phone_code'    => (string) $this->show_phone_code,
            'image'              => (string) $this->image,
            'short_name'         => (string) $this->short_name,
            'phone_number_limit' => (int) $this->phone_number_limit,
            'national_id_limit'  => (int) $this->national_id_limit,
        ];
    }
}
