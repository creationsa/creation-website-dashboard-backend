<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Media;

use Illuminate\Http\Resources\Json\JsonResource;

class MediaShowResource extends JsonResource
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
            $locales[$locale]['alt'] = $this->translate($locale)?->alt;
        }
        return [
            'id'    => (int) $this->id,
            'media' => (string) $this->path,
        ] + $locales;
    }
}
