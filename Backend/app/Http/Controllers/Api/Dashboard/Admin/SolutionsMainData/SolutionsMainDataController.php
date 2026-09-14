<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\SolutionsMainData;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\SolutionsMainData\SolutionsMainDataRequest;
use App\Http\Resources\Api\Dashboard\Admin\SolutionsMainData\SolutionsMainDataResource;
use App\Models\AppMedia;
use App\Models\SolutionMainDataItem;
use App\Models\SolutionsMainData;

class SolutionsMainDataController extends Controller
{
    private const RELATIONS = [
        'items', 'items.translations', 'items.media', 'items.media.translations',
        'tickerItems', 'tickerItems.translations',
        'accordionItems', 'accordionItems.translations',
        'media', 'media.translations',
    ];

    /**
     * Display the (single) solutions landing page intro, creating an empty
     * one on first use since the dashboard always expects a record to exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = SolutionsMainData::with(self::RELATIONS)->first();

        if (!$data) {
            $emptyLocale = [
                'first_title' => '', 'second_title' => '', 'third_title' => '',
                'core_desc' => '', 'core_sub_desc' => '',
                'items_header_first_title' => '', 'items_header_second_title' => '', 'items_header_third_title' => '',
                'accordion_items_header_first_title' => '', 'accordion_items_header_second_title' => '', 'accordion_items_header_third_title' => '',
                'nav_title' => '',
            ];
            $data = SolutionsMainData::create([
                'en' => $emptyLocale,
                'ar' => $emptyLocale,
            ])->fresh(self::RELATIONS);
        }

        return SolutionsMainDataResource::make($data)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the (single) solutions landing page intro.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\SolutionsMainData\SolutionsMainDataRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(SolutionsMainDataRequest $request)
    {
        $data = $request->validated();
        $model = SolutionsMainData::first();

        $payload = [
            'en' => [
                'first_title' => $data['first_title_en'],
                'second_title' => $data['second_title_en'],
                'third_title' => $data['third_title_en'],
                'core_desc' => $data['core_desc_en'],
                'core_sub_desc' => $data['core_sub_desc_en'],
                'items_header_first_title' => $data['items_header_first_title_en'],
                'items_header_second_title' => $data['items_header_second_title_en'],
                'items_header_third_title' => $data['items_header_third_title_en'],
                'accordion_items_header_first_title' => $data['accordion_items_header_first_title_en'],
                'accordion_items_header_second_title' => $data['accordion_items_header_second_title_en'],
                'accordion_items_header_third_title' => $data['accordion_items_header_third_title_en'],
                'nav_title' => $data['nav_title_en'],
            ],
            'ar' => [
                'first_title' => $data['first_title_ar'],
                'second_title' => $data['second_title_ar'],
                'third_title' => $data['third_title_ar'],
                'core_desc' => $data['core_desc_ar'],
                'core_sub_desc' => $data['core_sub_desc_ar'],
                'items_header_first_title' => $data['items_header_first_title_ar'],
                'items_header_second_title' => $data['items_header_second_title_ar'],
                'items_header_third_title' => $data['items_header_third_title_ar'],
                'accordion_items_header_first_title' => $data['accordion_items_header_first_title_ar'],
                'accordion_items_header_second_title' => $data['accordion_items_header_second_title_ar'],
                'accordion_items_header_third_title' => $data['accordion_items_header_third_title_ar'],
                'nav_title' => $data['nav_title_ar'],
            ],
            'slug' => $data['slug_en'],
        ];

        if (!$model) {
            $model = SolutionsMainData::create($payload);
        } else {
            $model->update($payload);
        }

        $this->syncItems($model, $data['items'] ?? []);
        $this->syncTickerItems($model, $data['ticker_items']);
        $this->syncAccordionItems($model, $data['accordion_items'] ?? []);
        $this->syncAccordionMedia($model, $data['accordion_media'] ?? null);

        return SolutionsMainDataResource::make($model->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * The dashboard sends the full ticker items list on every save without
     * ids, so the simplest correct sync is to replace them wholesale.
     */
    private function syncTickerItems(SolutionsMainData $model, array $items): void
    {
        $model->tickerItems()->delete();

        foreach ($items as $item) {
            $model->tickerItems()->create([
                'en' => ['text' => $item['text_en']],
                'ar' => ['text' => $item['text_ar']],
            ]);
        }
    }

    /**
     * Same reasoning as ticker items — pure text, safe to replace wholesale.
     */
    private function syncAccordionItems(SolutionsMainData $model, array $items): void
    {
        $model->accordionItems()->delete();

        foreach ($items as $item) {
            $model->accordionItems()->create([
                'en' => [
                    'title' => $item['title_en'],
                    'content_blocks' => $this->mapAccordionBlocks($item['content_blocks'] ?? [], 'en'),
                ],
                'ar' => [
                    'title' => $item['title_ar'],
                    'content_blocks' => $this->mapAccordionBlocks($item['content_blocks'] ?? [], 'ar'),
                ],
            ]);
        }
    }

    private function mapAccordionBlocks(array $blocks, string $locale): array
    {
        return array_map(fn ($block) => [
            'subtitle' => $block["subtitle_{$locale}"] ?? '',
            'description' => $block["description_{$locale}"] ?? '',
        ], $blocks);
    }

    /**
     * Each item exclusively owns its own AppMedia (feature_media [+
     * feature_media_poster]) via a dedicated child row. Items are matched
     * across saves by their feature_media's stored filename so unchanged
     * items are left alone — AppMedia deletes the physical file when a
     * row is removed, and the dashboard resubmits every item (including
     * unchanged ones, as their previously resolved full URL) on every
     * save.
     */
    /**
     * An item is either a manual entry (matched across saves by its
     * feature_media filename, as before) or a live reference to an
     * existing Project (matched by project_id instead, since it has no
     * media of its own to compare) — same discriminated-item pattern as
     * pagesBuilder's Featured Works / Home Blogs Teaser.
     */
    private function syncItems(SolutionsMainData $model, array $items): void
    {
        $existing = $model->items()->with('media')->get();

        $isProjectItem = fn ($item) => ($item['source'] ?? 'custom') === 'project';

        $submittedFilenames = collect($items)
            ->reject($isProjectItem)
            ->map(fn ($item) => $this->resolveFilename($item['feature_media']['file'] ?? null))
            ->filter()
            ->values();

        $submittedProjectIds = collect($items)
            ->filter($isProjectItem)
            ->pluck('project_id')
            ->filter()
            ->values();

        foreach ($existing as $item) {
            if ($item->source === 'project') {
                if (!$submittedProjectIds->contains($item->project_id)) {
                    foreach ($item->media as $media) {
                        $media->delete();
                    }
                    $item->delete();
                }
                continue;
            }

            $mainMedia = $item->media->firstWhere('option', 'feature_media');
            if (!$mainMedia || !$submittedFilenames->contains($mainMedia->media)) {
                foreach ($item->media as $media) {
                    $media->delete();
                }
                $item->delete();
            }
        }

        foreach ($items as $itemData) {
            if ($isProjectItem($itemData)) {
                $projectId = $itemData['project_id'] ?? null;
                if (!$projectId) {
                    continue;
                }

                $item = $model->items()->where('source', 'project')->where('project_id', $projectId)->first();
                $payload = [
                    'source' => 'project',
                    'project_id' => $projectId,
                    'project_media_field' => $itemData['project_media_field'] ?? null,
                    'item_slug' => null,
                    'en' => ['item_title' => ''],
                    'ar' => ['item_title' => ''],
                ];

                if ($item) {
                    $item->update($payload);
                } else {
                    $model->items()->create($payload);
                }

                continue;
            }

            $mediaData = $itemData['feature_media'] ?? null;
            $filename = $this->resolveFilename($mediaData['file'] ?? null);
            if (!$filename) {
                continue;
            }

            $item = $model->items()
                ->where('source', 'custom')
                ->whereHas('media', fn ($q) => $q->where('option', 'feature_media')->where('media', $filename))
                ->first();

            $itemPayload = [
                'source' => 'custom',
                'project_id' => null,
                'project_media_field' => null,
                'item_slug' => $itemData['item_slug_en'] ?? null,
                'en' => ['item_title' => $itemData['item_title_en'] ?? ''],
                'ar' => ['item_title' => $itemData['item_title_ar'] ?? ''],
            ];

            if (!$item) {
                $item = $model->items()->create($itemPayload);
            } else {
                $item->update($itemPayload);
            }

            $this->syncItemMedia($item, $mediaData, $filename);
        }
    }

    private function syncItemMedia(SolutionMainDataItem $item, ?array $data, string $filename): void
    {
        $media = $item->media()->where('option', 'feature_media')->first();
        if (!$media) {
            $media = new AppMedia();
            $media->app_mediaable_id = $item->id;
            $media->app_mediaable_type = SolutionMainDataItem::class;
            $media->option = 'feature_media';
        }
        $media->media_type = ($data['type'] ?? 'image') === 'video' ? 'video' : 'image';
        $media->media = $filename;
        $media->save();
        $media->update([
            'en' => ['alt' => $data['alt_en'] ?? ''],
            'ar' => ['alt' => $data['alt_ar'] ?? ''],
        ]);

        if ($this->isNewUpload($data['poster'] ?? null)) {
            $poster = $item->media()->where('option', 'feature_media_poster')->first();
            if (!$poster) {
                $poster = new AppMedia();
                $poster->app_mediaable_id = $item->id;
                $poster->app_mediaable_type = SolutionMainDataItem::class;
                $poster->option = 'feature_media_poster';
                $poster->media_type = 'image';
            }
            $poster->media = $data['poster'];
            $poster->save();
        }
    }

    /**
     * `file`/`poster` are only genuinely new when they don't already look
     * like a resolved URL — see SolutionController::isNewUpload() for the
     * full reasoning (same bug class, same fix).
     */
    private function syncAccordionMedia(SolutionsMainData $model, ?array $data): void
    {
        if (!$data) {
            return;
        }

        $media = $model->media()->where('option', 'accordion_media')->first();
        if (!$media) {
            $media = new AppMedia();
            $media->app_mediaable_id = $model->id;
            $media->app_mediaable_type = SolutionsMainData::class;
            $media->option = 'accordion_media';
        }
        $media->media_type = ($data['type'] ?? 'image') === 'video' ? 'video' : 'image';
        if ($this->isNewUpload($data['file'] ?? null)) {
            $media->media = $data['file'];
        }
        $media->save();
        $media->update([
            'en' => ['alt' => $data['alt_en'] ?? ''],
            'ar' => ['alt' => $data['alt_ar'] ?? ''],
        ]);

        if ($this->isNewUpload($data['poster'] ?? null)) {
            $poster = $model->media()->where('option', 'accordion_media_poster')->first();
            if (!$poster) {
                $poster = new AppMedia();
                $poster->app_mediaable_id = $model->id;
                $poster->app_mediaable_type = SolutionsMainData::class;
                $poster->option = 'accordion_media_poster';
                $poster->media_type = 'image';
            }
            $poster->media = $data['poster'];
            $poster->save();
        }
    }

    private function isNewUpload(?string $value): bool
    {
        return !empty($value) && !str_starts_with($value, 'http');
    }

    private function resolveFilename(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        return str_starts_with($value, 'http')
            ? basename(parse_url($value, PHP_URL_PATH) ?: $value)
            : $value;
    }
}
