<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Privacy;

use Illuminate\Http\Resources\Json\JsonResource;

class PrivacyResource extends JsonResource
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
            $locales[$locale]['desc'] = $this->translate($locale)?->desc;
        }

        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'desc'      => $this->desc,
        ] + $locales;

    }
}
