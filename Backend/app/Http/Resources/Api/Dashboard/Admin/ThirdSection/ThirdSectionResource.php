<?php

namespace App\Http\Resources\Api\Dashboard\Admin\ThirdSection;

use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ThirdSectionResource extends JsonResource
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
            $locales[$locale]['sub_title']   = $this->translate($locale)?->sub_title;
            $locales[$locale]['desc']   = $this->translate($locale)?->desc;
        }

        return [
            'id'            => $this->id,
            'image'         => $this->image,
            'title'         => $this->title,
            'sub_title'     => $this->sub_title,
            'desc'          => $this->desc,
            'category'      => CategoryResource::make($this->category),
        ]+$locales;
    }
}
