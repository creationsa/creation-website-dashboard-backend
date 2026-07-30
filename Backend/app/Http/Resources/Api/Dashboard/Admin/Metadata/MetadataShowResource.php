<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Metadata;

use Illuminate\Http\Resources\Json\JsonResource;

class MetadataShowResource extends JsonResource
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
            $locales[$locale]['title']           = $this->translate($locale)?->title;
            $locales[$locale]['canonical_tags']  = $this->translate($locale)?->canonical_tags;
            $locales[$locale]['image']           = $this->translate($locale)?->image;
            $locales[$locale]['type']            = $this->translate($locale)?->type;
            $locales[$locale]['description']     = $this->translate($locale)?->description;
            $locales[$locale]['keywords']        = $this->translate($locale)?->keywords;
        }
        return [
            'id'             => (int) $this->id,
            'title'          => (string) $this->title,
            'for'            => (string) $this->for,
            'canonical_tags' => (string) $this->canonical_tags,
            'image'          => (string) $this->image,
            'type'           => (string) $this->type,
            'description'    => (string) $this->description,
            'keywords'       => (string) $this->keywords,
        ] + $locales;
    }
}
