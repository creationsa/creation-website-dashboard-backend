<?php

namespace App\Http\Resources\Api\Dashboard\Admin\City;

use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Governrate\GovernrateItemResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CityDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $locales = [];

        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['name'] = @$this->translate($locale)?->name;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'is_active' => (bool) $this->is_active,
            'country'   => CountryItemResource::make($this->country),
            'governrate' => GovernrateItemResource::make($this->governrate),
            'area'      => $this->getAreaCoordinates(),
            'postal_code' => $this->postal_code,
            'short_cut'  => $this->short_cut
        ]+ $locales;

    }
}
