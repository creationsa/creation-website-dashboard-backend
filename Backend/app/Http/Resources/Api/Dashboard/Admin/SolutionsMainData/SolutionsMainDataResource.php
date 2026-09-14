<?php

namespace App\Http\Resources\Api\Dashboard\Admin\SolutionsMainData;

use Illuminate\Http\Resources\Json\JsonResource;

class SolutionsMainDataResource extends JsonResource
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
            'first_title_en' => (string) $this->translate('en')?->first_title,
            'first_title_ar' => (string) $this->translate('ar')?->first_title,
            'second_title_en' => (string) $this->translate('en')?->second_title,
            'second_title_ar' => (string) $this->translate('ar')?->second_title,
            'third_title_en' => (string) $this->translate('en')?->third_title,
            'third_title_ar' => (string) $this->translate('ar')?->third_title,

            'core_desc_en' => (string) $this->translate('en')?->core_desc,
            'core_desc_ar' => (string) $this->translate('ar')?->core_desc,

            'core_sub_desc_en' => (string) $this->translate('en')?->core_sub_desc,
            'core_sub_desc_ar' => (string) $this->translate('ar')?->core_sub_desc,

            'nav_title_en' => (string) $this->translate('en')?->nav_title,
            'nav_title_ar' => (string) $this->translate('ar')?->nav_title,
            'slug_en' => (string) $this->slug,

            'items_header' => [
                'first_title_en' => (string) $this->translate('en')?->items_header_first_title,
                'first_title_ar' => (string) $this->translate('ar')?->items_header_first_title,
                'second_title_en' => (string) $this->translate('en')?->items_header_second_title,
                'second_title_ar' => (string) $this->translate('ar')?->items_header_second_title,
                'third_title_en' => (string) $this->translate('en')?->items_header_third_title,
                'third_title_ar' => (string) $this->translate('ar')?->items_header_third_title,
            ],

            'items' => $this->items->map(fn ($item) => [
                'source' => $item->source,
                'project_id' => $item->project_id,
                'project_media_field' => $item->project_media_field,
                'feature_media' => $this->mediaField($item->media, 'feature_media'),
                'item_title_en' => (string) $item->translate('en')?->item_title,
                'item_title_ar' => (string) $item->translate('ar')?->item_title,
                'item_slug_en' => (string) $item->item_slug,
            ]),

            'ticker_items' => $this->tickerItems->map(fn ($item) => [
                'text_en' => (string) $item->translate('en')?->text,
                'text_ar' => (string) $item->translate('ar')?->text,
            ]),

            'accordion_items_header' => [
                'first_title_en' => (string) $this->translate('en')?->accordion_items_header_first_title,
                'first_title_ar' => (string) $this->translate('ar')?->accordion_items_header_first_title,
                'second_title_en' => (string) $this->translate('en')?->accordion_items_header_second_title,
                'second_title_ar' => (string) $this->translate('ar')?->accordion_items_header_second_title,
                'third_title_en' => (string) $this->translate('en')?->accordion_items_header_third_title,
                'third_title_ar' => (string) $this->translate('ar')?->accordion_items_header_third_title,
            ],
            'accordion_media' => $this->mediaField($this->media, 'accordion_media'),
            'accordion_items' => $this->accordionItems->map(function ($item) {
                $enBlocks = $item->translate('en')?->content_blocks ?? [];
                $arBlocks = $item->translate('ar')?->content_blocks ?? [];

                return [
                    'title_en' => (string) $item->translate('en')?->title,
                    'title_ar' => (string) $item->translate('ar')?->title,
                    'content_blocks' => collect($enBlocks)->map(fn ($block, $i) => [
                        'subtitle_en' => (string) ($block['subtitle'] ?? ''),
                        'subtitle_ar' => (string) ($arBlocks[$i]['subtitle'] ?? ''),
                        'description_en' => (string) ($block['description'] ?? ''),
                        'description_ar' => (string) ($arBlocks[$i]['description'] ?? ''),
                    ])->values(),
                ];
            }),
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
