<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Solution;

use Illuminate\Http\Resources\Json\JsonResource;

class SolutionPickerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => (int) $this->id,
            'title_en' => (string) $this->translate('en')?->title,
            'title_ar' => (string) $this->translate('ar')?->title,
            'small_description_en' => (string) $this->translate('en')?->small_description,
            'small_description_ar' => (string) $this->translate('ar')?->small_description,
            'slug_en' => (string) $this->translate('en')?->slug,
        ];
    }
}
