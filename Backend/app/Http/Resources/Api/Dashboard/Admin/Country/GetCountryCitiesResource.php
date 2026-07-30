<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Country;

use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GetCountryCitiesResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
        ];

    }
}
