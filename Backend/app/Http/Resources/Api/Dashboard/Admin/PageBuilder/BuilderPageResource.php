<?php

namespace App\Http\Resources\Api\Dashboard\Admin\PageBuilder;

use Illuminate\Http\Resources\Json\JsonResource;

class BuilderPageResource extends JsonResource
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
            'title' => (string) $this->title,
            'is_home' => (bool) $this->is_home,
        ];
    }
}
