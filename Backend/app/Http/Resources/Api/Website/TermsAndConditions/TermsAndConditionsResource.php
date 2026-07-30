<?php

namespace App\Http\Resources\Api\Website\TermsAndConditions;

use Illuminate\Http\Resources\Json\JsonResource;

class TermsAndConditionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['title'] = $this->translate($locale)?->title;
            $locales[$locale]['description'] = $this->translate($locale)?->description;
        }

        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'description'   => $this->description,
        ] + $locales;

    }
}
