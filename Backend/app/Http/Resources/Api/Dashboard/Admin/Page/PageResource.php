<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Page;

use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
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
            'id'              => $this->id,
            'title'           => $this->title,
            'desc'            => $this->desc,
            'type'            => $this->type,
            'ordering'        => $this->ordering,
        ];

    }
}
