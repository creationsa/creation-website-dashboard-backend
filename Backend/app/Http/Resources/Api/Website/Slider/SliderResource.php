<?php

namespace App\Http\Resources\Api\Website\Slider;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;

class SliderResource extends JsonResource
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
            $locales[$locale]['title']   = $this->translate($locale)?->title;
            $locales[$locale]['desc']   = $this->translate($locale)?->desc;
        }

        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'type'         => $this->type ?? 'normal',
            'show_desc'    => $this->show_desc,
            'category'     => CategoryResource::make($this->category),
            'link'         => $this->link,
            'desc'          => $this->desc,
            'image_ar'     => $this->image_ar,
            'image_en'     => $this->image_en,
        ]+$locales;
    }
}
