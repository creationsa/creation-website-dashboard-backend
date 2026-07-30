<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Asset;

use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class StyleResource extends JsonResource
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
            'id'                => $this->id,
            'name'              => $this->name,
            'fontWeightNum'   => $this->font_weight_num,
            'fontStyle'        => $this->font_style,
        ];
    }
}
