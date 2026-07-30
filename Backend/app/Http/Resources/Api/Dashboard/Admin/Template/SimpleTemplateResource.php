<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Template;

use App\Models\UserTemplate;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;
use App\Http\Resources\Api\Website\UserTemplate\SimpleUserTemplateResource;
use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use App\Http\Resources\Api\Dashboard\Admin\TemplateType\TemplateTypeResource;

class SimpleTemplateResource extends JsonResource
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
        ] + $locales;
    }
}
