<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Solution;

use Illuminate\Http\Resources\Json\JsonResource;

class SolutionShowResource extends JsonResource
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
            'metadata_id' => $this->metadata?->id,

            'title_en' => (string) $this->translate('en')?->title,
            'title_ar' => (string) $this->translate('ar')?->title,
            'slug_en' => (string) $this->translate('en')?->slug,

            'first_title_en' => (string) $this->translate('en')?->first_title,
            'first_title_ar' => (string) $this->translate('ar')?->first_title,
            'second_title_en' => (string) $this->translate('en')?->second_title,
            'second_title_ar' => (string) $this->translate('ar')?->second_title,
            'third_title_en' => (string) $this->translate('en')?->third_title,
            'third_title_ar' => (string) $this->translate('ar')?->third_title,

            'proposition_title_en' => (string) $this->translate('en')?->proposition_title,
            'proposition_title_ar' => (string) $this->translate('ar')?->proposition_title,
            'proposition_desc_en' => (string) $this->translate('en')?->proposition_desc,
            'proposition_desc_ar' => (string) $this->translate('ar')?->proposition_desc,
            'small_description_en' => (string) $this->translate('en')?->small_description,
            'small_description_ar' => (string) $this->translate('ar')?->small_description,

            'execution_title_en' => (string) $this->translate('en')?->execution_title,
            'execution_title_ar' => (string) $this->translate('ar')?->execution_title,

            'card_icon' => $this->mediaField($this->media, 'card_icon'),
            'execution_keys' => $this->executionKeys->map(fn ($key) => [
                'label_en' => (string) $key->translate('en')?->label,
                'label_ar' => (string) $key->translate('ar')?->label,
                'value_en' => (string) $key->translate('en')?->value,
                'value_ar' => (string) $key->translate('ar')?->value,
            ]),

            'items' => $this->items->map(fn ($item) => [
                'source' => $item->source,
                'project_id' => $item->project_id,
                'project_media_field' => $item->project_media_field,
                'feature_media' => $this->mediaField($item->media, 'feature_media'),
            ]),

            'ticker_items' => $this->tickerItems->map(fn ($item) => [
                'text_en' => (string) $item->translate('en')?->text,
                'text_ar' => (string) $item->translate('ar')?->text,
            ]),
        ];
    }

    /**
     * Build a `{type, file, alt_en, alt_ar, poster}` value (matching the
     * dashboard's SmartMediaField shape) from an already-loaded AppMedia
     * collection tagged with this field's option.
     */
    protected function mediaField($mediaCollection, string $field): array
    {
        $media = $mediaCollection->firstWhere('option', $field);
        $poster = $mediaCollection->firstWhere('option', $field . '_poster');

        return [
            'type' => $media?->media_type === 'video' ? 'video' : 'image',
            'file' => $media?->path ?? '',
            'alt_en' => $media?->translate('en')?->alt ?? '',
            'alt_ar' => $media?->translate('ar')?->alt ?? '',
            'poster' => $poster?->path ?? '',
        ];
    }
}
