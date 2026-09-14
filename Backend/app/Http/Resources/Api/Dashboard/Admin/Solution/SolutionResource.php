<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Solution;

use Illuminate\Http\Resources\Json\JsonResource;

class SolutionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // The card_icon SVG *is* this solution's representative image —
        // not a second image alongside a gallery photo. The 5 gallery
        // items are detail-page content, not a listing thumbnail.
        $icon = $this->media->firstWhere('option', 'card_icon');

        return [
            'id' => (int) $this->id,
            'title' => (string) $this->title,
            'slug' => (string) $this->slug,
            // The card blurb, not the full value-proposition paragraph —
            // this is the same text shown on the website's own card.
            'description' => (string) $this->small_description,
            'base_image' => [
                'id' => $icon?->id,
                'media' => $icon?->path ?? '',
                'alt' => $icon?->alt ?? '',
                'en' => ['alt' => $icon?->translate('en')?->alt ?? ''],
                'ar' => ['alt' => $icon?->translate('ar')?->alt ?? ''],
            ],
        ];
    }
}
