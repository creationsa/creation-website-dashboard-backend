<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Subcategory;

use Illuminate\Http\Resources\Json\JsonResource;


class SubcategoryResource extends JsonResource
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
            $locales[$locale]['name'] = $this->translate($locale)?->name;
            $locales[$locale]['description'] = $this->translate($locale)?->description;
        }

        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'type'              => $this->type, // general - private
            'description'       => $this->description,
            'small_image'       => $this->getSmallImageAttribute(),
            'big_image'         => $this->getBigImageAttribute(),
            'category_id'       => $this->getCategoryId(),
        ] + $locales;

    }
}
