<?php

namespace App\Http\Resources\Api\Dashboard\Admin\About;

use Illuminate\Http\Resources\Json\JsonResource;

class AboutIndexResource extends JsonResource
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
            'id'         => (int) $this->id,
            'image'      => $this->main_image,
            'title'      => (string) $this->title,
            'desc'       => (string) $this->desc,
            'slug'       => (string) $this->slug,
            'is_active'  => (bool) $this->is_active,
            'created_at' => $this->created_at->format('Y-m-d')
        ];
    }
}
