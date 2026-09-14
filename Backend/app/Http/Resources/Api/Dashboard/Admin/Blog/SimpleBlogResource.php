<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Blog;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleBlogResource extends JsonResource
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
            'id'                   => $this->id,
            'title'                => $this->title,
            'seo_desc'             => $this->seo_desc,
            'slug'                 => $this->slug,
            'base_image'           => $this->base_image_object,
            'show_in_home'         => (bool) $this->show_in_home,
            'created_at'            => Carbon::parse($this->created_at)->format('Y-m-d h:i A'),
        ];

    }
}
