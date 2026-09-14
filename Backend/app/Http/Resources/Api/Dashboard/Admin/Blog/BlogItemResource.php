<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Blog;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Metadata\MetadataResource;
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Metadata\MetadataShowResource;

class BlogItemResource extends JsonResource
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
            $locales[$locale]['desc']        = $this->translate($locale)?->desc;
        }
        return [
            'id'                   => $this->id,
            'desc'                 => $this->desc,
            'created_at'           => Carbon::parse($this->created_at)->format('Y-m-d h:i A'),
        ]+$locales;

    }
}
