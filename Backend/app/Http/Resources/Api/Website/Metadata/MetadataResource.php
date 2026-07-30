<?php

namespace App\Http\Resources\Api\Website\Metadata;

use Illuminate\Http\Resources\Json\JsonResource;

class MetadataResource extends JsonResource
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
            'id'             => (int) $this->id,
            'title'          => (string) $this->title,
            'canonical_tags' => (string) $this->canonical_tags,
            'image'          => (string) $this->image,
            'type'           => (string) $this->type,
            'description'    => (string) $this->description,
            'keywords'       => (string) $this->keywords,
        ];
    }
}
