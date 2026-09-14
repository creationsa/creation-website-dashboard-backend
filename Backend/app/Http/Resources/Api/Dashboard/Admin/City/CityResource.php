<?php

namespace App\Http\Resources\Api\Dashboard\Admin\City;

use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Governrate\GovernrateItemResource;
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
            'id' => $this->id,
            'name' => $this->name,
            'is_active' => (bool) $this->is_active,
            'area'      => $this->getAreaCoordinates(),
            'country'   => CountryItemResource::make($this->country),
            'governrate' => GovernrateItemResource::make($this->governrate),
        ];

    }
}
