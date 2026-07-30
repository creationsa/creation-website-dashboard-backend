<?php

namespace App\Http\Resources\Api\Dashboard\Admin\SecondSection;

use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SecondSectionResource extends JsonResource
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
        }

        return [
            'id'            => $this->id,
            'image'         => $this->image,
            'title'         => $this->title,
            'is_wide'       => (bool) $this->is_wide,
            'category'      => CategoryResource::make($this->category),
        ]+$locales;
    }
}
