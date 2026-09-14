<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $coverField = $this->cover_media_field ?: 'first_cover_media';
        $cover = $this->media->firstWhere('option', $coverField);
        $isVideo = $cover?->media_type === 'video';
        $poster = $isVideo ? $this->media->firstWhere('option', $coverField . '_poster') : null;

        return [
            'id' => (int) $this->id,
            'title' => (string) $this->title,
            'slug' => (string) $this->slug,
            'base_image' => [
                'id' => $cover?->id,
                'media' => $cover?->path ?? '',
                'type' => $isVideo ? 'video' : 'image',
                'poster' => $poster?->path ?? '',
                'alt' => $cover?->alt ?? '',
                'en' => ['alt' => $cover?->translate('en')?->alt ?? ''],
                'ar' => ['alt' => $cover?->translate('ar')?->alt ?? ''],
            ],
        ];
    }
}
