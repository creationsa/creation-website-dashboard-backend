<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Country;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryDetailsResource extends JsonResource
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
            $locales[$locale]['name']        = $this->translate($locale)?->name;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'key' => $this->key,
            'flag' => $this->flag,
        ]+ $locales;

    }
}
