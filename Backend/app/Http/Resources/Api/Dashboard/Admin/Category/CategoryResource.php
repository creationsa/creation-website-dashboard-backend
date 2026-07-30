<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Category;

use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;
class CategoryResource extends JsonResource
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
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type, // general - private
            'subcategories' => SubcategoryResource::collection($this->subcategories),
        ] + $locales;

    }
}
