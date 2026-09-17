<?php

namespace App\Http\Resources\Api\Website\Blog;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                   => (int) $this->id,
            'title'                => (string) $this->title,
            'slug'                 => (string) $this->slug,
            'seo_desc'             => (string) $this->seo_desc,
            'first_sub_title'      => (string) $this->first_sub_title,
            'first_desc'           => (string) $this->first_desc,
            'second_sub_title'     => (string) $this->second_sub_title,
            'second_desc'          => (string) $this->second_desc,
            'base_image'           => $this->base_image,
            'base_image_object'    => $this->base_image_object,
            'cover_image'          => $this->cover_image,
            'cover_image_object'   => $this->cover_image_object,
            'items'                => BlogItemResource::collection($this->items),
            'related_blogs'        => SimpleBlogResource::collection($this->relatedBlogs),
            'created_at'           => Carbon::parse($this->created_at)->format('Y-m-d h:i A'),
        ];
    }
}
