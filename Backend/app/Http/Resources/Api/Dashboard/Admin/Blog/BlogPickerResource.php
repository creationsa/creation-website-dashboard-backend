<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Blog;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogPickerResource extends JsonResource
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
            'slug_en' => (string) $this->translate('en')?->slug,
            'base_image' => (string) $this->base_image,
        ];
    }
}
