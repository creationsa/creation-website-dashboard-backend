<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectShowResource extends JsonResource
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

            'first_title_en' => (string) $this->translate('en')?->first_title,
            'first_title_ar' => (string) $this->translate('ar')?->first_title,
            'second_title_en' => (string) $this->translate('en')?->second_title,
            'second_title_ar' => (string) $this->translate('ar')?->second_title,
            'third_title_en' => (string) $this->translate('en')?->third_title,
            'third_title_ar' => (string) $this->translate('ar')?->third_title,

            'first_cover_media' => $this->mediaField('first_cover_media'),
            'overview_description_en' => (string) $this->translate('en')?->overview_description,
            'overview_description_ar' => (string) $this->translate('ar')?->overview_description,

            'second_cover_media' => $this->mediaField('second_cover_media'),
            'stats_title_en' => (string) $this->translate('en')?->stats_title,
            'stats_title_ar' => (string) $this->translate('ar')?->stats_title,
            'stat_one_value' => (string) $this->stat_one_value,
            'stat_one_label_en' => (string) $this->translate('en')?->stat_one_label,
            'stat_one_label_ar' => (string) $this->translate('ar')?->stat_one_label,
            'stat_two_value' => (string) $this->stat_two_value,
            'stat_two_label_en' => (string) $this->translate('en')?->stat_two_label,
            'stat_two_label_ar' => (string) $this->translate('ar')?->stat_two_label,
            'stat_three_value' => (string) $this->stat_three_value,
            'stat_three_label_en' => (string) $this->translate('en')?->stat_three_label,
            'stat_three_label_ar' => (string) $this->translate('ar')?->stat_three_label,

            'cover_media_field' => $this->cover_media_field,
            'feature_media_field' => $this->feature_media_field,

            'first_media' => $this->mediaField('first_media'),
            'second_media' => $this->mediaField('second_media'),
            'third_media' => $this->mediaField('third_media'),
            'fourth_media' => $this->mediaField('fourth_media'),
            'fifth_media' => $this->mediaField('fifth_media'),
            'sixth_media' => $this->mediaField('sixth_media'),
            'seventh_media' => $this->mediaField('seventh_media'),
            'eighth_media' => $this->mediaField('eighth_media'),

            'ticker_items' => $this->tickerItems->map(fn ($item) => [
                'text_en' => (string) $item->translate('en')?->text,
                'text_ar' => (string) $item->translate('ar')?->text,
            ]),

            'metadata_id' => $this->metadata?->id,
        ];
    }

    /**
     * Build a `{type, file, alt_en, alt_ar, poster}` value (matching the
     * dashboard's SmartMediaField shape) from the AppMedia rows tagged with
     * this field's option. The poster (video only) is a second AppMedia row
     * tagged "{field}_poster" since a media row only holds one file.
     */
    protected function mediaField(string $field): array
    {
        $media = $this->media->firstWhere('option', $field);
        $poster = $this->media->firstWhere('option', $field . '_poster');

        return [
            'type' => $media?->media_type === 'video' ? 'video' : 'image',
            'file' => $media?->path ?? '',
            'alt_en' => $media?->translate('en')?->alt ?? '',
            'alt_ar' => $media?->translate('ar')?->alt ?? '',
            'poster' => $poster?->path ?? '',
        ];
    }
}
