<?php

namespace App\Http\Resources\Api\Dashboard\Admin\TemplateType;


use Illuminate\Http\Resources\Json\JsonResource;


class TemplateTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            // Include any other fields you want to expose
        ];
    }
}