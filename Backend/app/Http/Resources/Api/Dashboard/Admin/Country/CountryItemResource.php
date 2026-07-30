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
            'id'                    => $this->id,
            'flag'                  => $this->flag,
            'phone_code'            => $this->phone_code,
            'show_phone_code'       => $this->show_phone_code,
            'name'                  => $this->name,
        ];
    }
}
