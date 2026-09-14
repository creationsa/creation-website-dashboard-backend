<?php

namespace App\Http\Resources\Api\Dashboard\Admin\BlogsMainData;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogsMainDataResource extends JsonResource
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
            'nav_title_en' => (string) $this->translate('en')?->nav_title,
            'nav_title_ar' => (string) $this->translate('ar')?->nav_title,
            'slug_en' => (string) $this->slug,
        ];
    }
}
