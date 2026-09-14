<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Project;

use App\Models\Project;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectPickerResource extends JsonResource
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
            'id' => (int) $this->id,
            'title_en' => (string) $this->translate('en')?->title,
            'title_ar' => (string) $this->translate('ar')?->title,
            'slug_en' => (string) $this->translate('en')?->slug,
            'feature_media_field' => $this->feature_media_field,

            // Every slot is offered, image or video — a video slot's
            // "image" is its poster, so the picker always has something to
            // show as a thumbnail regardless of media type.
            'media' => collect(Project::MEDIA_FIELDS)
                ->map(function ($field) {
                    $media = $this->media->firstWhere('option', $field);

                    if (!$media) {
                        return null;
                    }

                    $isVideo = $media->media_type === 'video';

                    return [
                        'field' => $field,
                        'type' => $isVideo ? 'video' : 'image',
                        'image' => $isVideo
                            ? $this->media->firstWhere('option', $field.'_poster')?->path
                            : $media->path,
                    ];
                })
                ->filter()
                ->values(),
        ];
    }
}
