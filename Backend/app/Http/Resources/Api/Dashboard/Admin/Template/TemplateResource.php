<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Template;

use App\Models\UserTemplate;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;
use App\Http\Resources\Api\Website\UserTemplate\SimpleUserTemplateResource;
use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use App\Http\Resources\Api\Dashboard\Admin\TemplateType\TemplateTypeResource;

class TemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $user_template = UserTemplate::where('template_id', $this->id)->first();
        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['name'] = $this->translate($locale)?->name;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'parent' => $this->when($this->parent, function () {
                foreach (config('translatable.locales') as $locale) {
                    $parent_locales[$locale]['name'] = $this->parent->translate($locale)?->name;
                }
                return [
                    'id' => $this->parent->id,
                    'name' => $this->parent->name,
                ] + $parent_locales;
            }),
            'children' => $this->when($this->children->count(), TemplateResource::collection($this->children)),
            'category' => CategoryResource::make($this->category),
            'subcategory' => SubcategoryResource::make($this->subcategory),
            'template_type' => TemplateTypeResource::make($this->templateType),
            'price' => $this->price,
            'image' => $this->getImageAttribute(),
            'template_preview' => $this->getTemplatePreview(),
            'template_assets' => $this->getTemplateAssets(),
            'design' => $this->design,
            'is_favorite' => $this->is_favorite,
            'color_image' => $this->getColorImageAttribute(),
            'color_type' => $this->color_type,
            'hexa' => $this->hexa,
            'ordering' => (int) $this->ordering,
            'user_template' => $this->when($this->category->type == 'private', function () use ($user_template) {
                return SimpleUserTemplateResource::make($user_template);
            })
        ] + $locales;
    }
}
