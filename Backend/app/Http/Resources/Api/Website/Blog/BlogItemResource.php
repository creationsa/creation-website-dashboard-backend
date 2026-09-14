<?php

namespace App\Http\Resources\Api\Website\Blog;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'   => (int) $this->id,
            'desc' => (string) $this->desc,
        ];
    }
}
