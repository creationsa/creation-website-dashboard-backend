<?php

namespace App\Http\Resources\Api\Dashboard\Admin\About;

use App\Http\Resources\Api\Dashboard\Admin\Media\MediaShowResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $main_image   = $this->media()->where('option', 'main_image')->first();
        $other_images = $this->media()->where('option', null)->get();
        $locales      = [];

        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['title'] = $this->translate($locale)?->title;
            $locales[$locale]['desc']  = $this->translate($locale)?->desc;
            $locales[$locale]['slug']  = $this->translate($locale)?->slug;
        }

        return [
            'id'           => (int) $this->id,
            'main_image'   => $main_image ? MediaShowResource::make($main_image) : null,
            'other_images' => MediaShowResource::collection($other_images),
            'title'        => (string) $this->title,
            'desc'         => (string) $this->desc,
            'slug'         => (string) $this->slug,
            'is_active'    => (bool) $this->is_active,
            'created_at'   => $this->created_at->format('Y-m-d')
        ] + $locales;
    }
}
