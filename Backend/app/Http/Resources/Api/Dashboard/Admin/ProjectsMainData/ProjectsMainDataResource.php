<?php

namespace App\Http\Resources\Api\Dashboard\Admin\ProjectsMainData;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectsMainDataResource extends JsonResource
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
            'first_title_en' => (string) $this->translate('en')?->first_title,
            'first_title_ar' => (string) $this->translate('ar')?->first_title,
            'second_title_en' => (string) $this->translate('en')?->second_title,
            'second_title_ar' => (string) $this->translate('ar')?->second_title,
            'third_title_en' => (string) $this->translate('en')?->third_title,
            'third_title_ar' => (string) $this->translate('ar')?->third_title,

            'overview_description_en' => (string) $this->translate('en')?->overview_description,
            'overview_description_ar' => (string) $this->translate('ar')?->overview_description,

            'nav_title_en' => (string) $this->translate('en')?->nav_title,
            'nav_title_ar' => (string) $this->translate('ar')?->nav_title,
            'slug_en' => (string) $this->slug,
        ];
    }
}
