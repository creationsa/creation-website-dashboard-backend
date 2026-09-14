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
            $locales[$locale]['name']        = @$this->translate($locale)?->name;
            // $locales[$locale]['currency']    = @$this->translate($locale)?->currency;
            // $locales[$locale]['short_name']  = @$this->translate($locale)?->short_name;
            // $locales[$locale]['nationality'] = @$this->translate($locale)?->nationality;
            // $locales[$locale]['slug']        = @$this->translate($locale)?->slug;
        }

        return [
            'id'                 => $this->id,
            'name'               => $this->name,
            // 'currency'           => $this->currency,
            // 'short_name'         => $this->short_name,
            // 'nationality'        => $this->nationality,
            // 'national_id_limit'  => $this->national_id_limit,
            // 'slug'               => $this->slug,
            'phone_code'         => $this->phone_code,
            'phone_number_limit' => $this->phone_number_limit,
            'flag'               => $this->flag,
            // 'is_active'          => (bool) $this->is_active,
        ] + $locales;
    }
}
