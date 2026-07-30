<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Asset;

use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PageStyleResource extends JsonResource
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
            'id'          => $this->id,
            'name'        => $this->name,
            'font'        => [
                'name'          => $this->font_name,
                'url'           => $this->custom_font == true ? $this->file : $this->font_url,
                'customFont'   => $this->custom_font,
                'format'        => $this->format,
                'styles'        => StyleResource::collection($this->pageStyleStyles),
            ],
            'size'      => $this->size,
        ];
    }
}
