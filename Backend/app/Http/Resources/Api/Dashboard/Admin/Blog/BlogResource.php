<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Blog;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Metadata\MetadataResource;
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Metadata\MetadataShowResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $locales = [];

        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['title']        = $this->translate($locale)?->title;
            $locales[$locale]['slug']        = $this->translate($locale)?->slug;
            $locales[$locale]['seo_desc']        = $this->translate($locale)?->seo_desc;
            $locales[$locale]['first_sub_title']        = $this->translate($locale)?->first_sub_title;
            $locales[$locale]['first_desc']        = $this->translate($locale)?->first_desc;
            $locales[$locale]['second_desc']        = $this->translate($locale)?->second_desc;
            $locales[$locale]['second_sub_title']        = $this->translate($locale)?->second_sub_title;
        }
        return [
            'id'                   => $this->id,
            'base_image'           => $this->base_image,
            'base_image_object'    => $this->base_image_object,
            'cover_image'          => $this->cover_image,
            'cover_image_object'   => $this->cover_image_object,
            'items'                => BlogItemResource::collection($this->items),
            'created_at'           => Carbon::parse($this->created_at)->format('Y-m-d h:i A'),
        ]+$locales;

    }
}
