<?php

namespace App\Http\Resources\Api\Website\Blog;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleBlogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'          => (int) $this->id,
            'title'       => (string) $this->title,
            'slug'        => (string) $this->slug,
            'base_image'  => $this->base_image_object,
            'created_at'  => Carbon::parse($this->created_at)->format('Y-m-d h:i A'),
        ];
    }
}
