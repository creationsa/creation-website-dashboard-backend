<?php

namespace App\Http\Resources\Api\Website\About;

use Illuminate\Http\Resources\Json\JsonResource;

class AboutHomeResource extends JsonResource
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
            'id'    => (int) $this->id,
            'image' => $this->main_image,
            'title' => (string) $this->title,
            'desc'  => (string) $this->desc,
        ];
    }
}
