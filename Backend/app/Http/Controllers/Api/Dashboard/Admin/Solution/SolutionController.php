<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Solution;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Solution\SolutionRequest;
use App\Http\Resources\Api\Dashboard\Admin\Solution\{SolutionPickerResource, SolutionResource, SolutionShowResource};
use App\Models\AppMedia;
use App\Models\Solution;
use App\Models\SolutionItem;
use Illuminate\Http\Request;

class SolutionController extends Controller
{
    private const RELATIONS = [
        'executionKeys', 'executionKeys.translations',
        'items', 'items.media', 'items.media.translations',
        'tickerItems', 'tickerItems.translations',
        'media', 'media.translations',
        'metadata',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->input('per_page', 10), 1), 100);
        $sortDirection = $request->input('sort') === 'asc' ? 'asc' : 'desc';

        $solutions = Solution::with(['media', 'media.translations'])
            ->when($request->keyword, function ($query) use ($request) {
                $query->whereTranslationLike('title', '%' . $request->keyword . '%');
            })
            ->orderBy('created_at', $sortDirection)
            ->paginate($perPage);

        return SolutionResource::collection($solutions)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Lightweight, unpaginated listing used by other dashboard features
     * (e.g. the Display Info section's "pick an existing solution" left
     * side) to let the admin pick a solution and pull its title/
     * description/slug live.
     *
     * @return \Illuminate\Http\Response
     */
    public function picker()
    {
        $solutions = Solution::latest()->get();

        return SolutionPickerResource::collection($solutions)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Solution\SolutionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SolutionRequest $request)
    {
        $data = $request->validated();

        $solution = Solution::create($this->solutionData($data));
        $this->syncExecutionKeys($solution, $data['execution_keys']);
        $this->syncItems($solution, $data['items'] ?? []);
        $this->syncTickerItems($solution, $data['ticker_items']);
        $this->syncCardIcon($solution, $data['card_icon'] ?? null);

        return SolutionShowResource::make($solution->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $solution = Solution::with(self::RELATIONS)->findOrFail($id);

        return SolutionShowResource::make($solution)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Solution\SolutionRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SolutionRequest $request, $id)
    {
        $solution = Solution::findOrFail($id);
        $data = $request->validated();

        $solution->update($this->solutionData($data));
        $this->syncExecutionKeys($solution, $data['execution_keys']);
        $this->syncItems($solution, $data['items'] ?? []);
        $this->syncTickerItems($solution, $data['ticker_items']);
        $this->syncCardIcon($solution, $data['card_icon'] ?? null);

        return SolutionShowResource::make($solution->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solution = Solution::with(['items', 'items.media', 'metadata'])->findOrFail($id);

        foreach ($solution->items as $item) {
            foreach ($item->media as $media) {
                $media->delete();
            }
            $item->delete();
        }
        $solution->metadata?->delete();
        $solution->delete();

        return $this->successResponse(trans('Deleted successfully'));
    }

    /**
     * Map the flat `_en`/`_ar` request fields into the nested locale arrays
     * the translatable package expects, excluding the execution keys,
     * items, and ticker items which are synced separately.
     */
    private function solutionData(array $data): array
    {
        return [
            'en' => [
                'title' => $data['title_en'],
                'slug' => $data['slug_en'],
                'first_title' => $data['first_title_en'],
                'second_title' => $data['second_title_en'],
                'third_title' => $data['third_title_en'],
                'proposition_title' => $data['proposition_title_en'],
                'proposition_desc' => $data['proposition_desc_en'],
                'small_description' => $data['small_description_en'],
                'execution_title' => $data['execution_title_en'],
            ],
            'ar' => [
                'title' => $data['title_ar'],
                // The dashboard only collects one (English) slug — mirror it
                // to the Arabic translation row like the projects feature does.
                'slug' => strtolower(str_replace(' ', '-', $data['slug_en'])),
                'first_title' => $data['first_title_ar'],
                'second_title' => $data['second_title_ar'],
                'third_title' => $data['third_title_ar'],
                'proposition_title' => $data['proposition_title_ar'],
                'proposition_desc' => $data['proposition_desc_ar'],
                'small_description' => $data['small_description_ar'],
                'execution_title' => $data['execution_title_ar'],
            ],
        ];
    }

    /**
     * The dashboard always sends exactly 5 execution keys with no ids, so
     * the simplest correct sync is to replace them wholesale (pure text,
     * no files involved).
     */
    private function syncExecutionKeys(Solution $solution, array $keys): void
    {
        $solution->executionKeys()->delete();

        foreach ($keys as $key) {
            $solution->executionKeys()->create([
                'en' => ['label' => $key['label_en'], 'value' => $key['value_en']],
                'ar' => ['label' => $key['label_ar'], 'value' => $key['value_ar']],
            ]);
        }
    }

    /**
     * Same reasoning as execution keys — pure text, safe to replace wholesale.
     */
    private function syncTickerItems(Solution $solution, array $items): void
    {
        $solution->tickerItems()->delete();

        foreach ($items as $item) {
            $solution->tickerItems()->create([
                'en' => ['text' => $item['text_en']],
                'ar' => ['text' => $item['text_ar']],
            ]);
        }
    }

    /**
     * The single SVG shown on this solution's listing card — an image
     * the solution owns directly, not one of its gallery items.
     */
    private function syncCardIcon(Solution $solution, ?array $data): void
    {
        if (!$data) {
            return;
        }

        $media = $solution->media()->where('option', 'card_icon')->first();
        if (!$media) {
            $media = new AppMedia();
            $media->app_mediaable_id = $solution->id;
            $media->app_mediaable_type = Solution::class;
            $media->option = 'card_icon';
        }
        $media->media_type = 'image';
        if ($this->isNewUpload($data['file'] ?? null)) {
            $media->media = $data['file'];
        }
        $media->save();
        $media->update([
            'en' => ['alt' => $data['alt_en'] ?? ''],
            'ar' => ['alt' => $data['alt_ar'] ?? ''],
        ]);
    }

    /**
     * A gallery item is either a manual upload — media-only, exclusively
     * owning its own AppMedia (feature_media [+ feature_media_poster])
     * via a dedicated child row, matched across saves by that media's
     * stored filename — or a live reference to an existing Project,
     * matched by project_id instead since it has no media of its own to
     * compare. Same discriminated-item pattern as
     * SolutionsMainDataController::syncItems().
     */
    private function syncItems(Solution $solution, array $items): void
    {
        $existing = $solution->items()->with('media')->get();

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

                $item = $solution->items()->where('source', 'project')->where('project_id', $projectId)->first();
                $payload = [
                    'source' => 'project',
                    'project_id' => $projectId,
                    'project_media_field' => $itemData['project_media_field'] ?? null,
                ];

                if ($item) {
                    $item->update($payload);
                } else {
                    $solution->items()->create($payload);
                }

                continue;
            }

            $mediaData = $itemData['feature_media'] ?? null;
            $filename = $this->resolveFilename($mediaData['file'] ?? null);
            if (!$filename) {
                continue;
            }

            $item = $solution->items()
                ->where('source', 'custom')
                ->whereHas('media', fn ($q) => $q->where('option', 'feature_media')->where('media', $filename))
                ->first();

            if (!$item) {
                $item = $solution->items()->create(['source' => 'custom']);
            }

            $this->syncItemMedia($item, $mediaData, $filename);
        }
    }

    private function syncItemMedia(SolutionItem $item, ?array $data, string $filename): void
    {
        $media = $item->media()->where('option', 'feature_media')->first();
        if (!$media) {
            $media = new AppMedia();
            $media->app_mediaable_id = $item->id;
            $media->app_mediaable_type = SolutionItem::class;
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
                $poster->app_mediaable_type = SolutionItem::class;
                $poster->option = 'feature_media_poster';
                $poster->media_type = 'image';
            }
            $poster->media = $data['poster'];
            $poster->save();
        }
    }

    /**
     * The dashboard resubmits every media value on save, including
     * unchanged ones, as the previously resolved full URL (not a bare
     * filename). Only a genuinely new upload should overwrite a stored
     * value.
     */
    private function isNewUpload(?string $value): bool
    {
        return !empty($value) && !str_starts_with($value, 'http');
    }

    /**
     * Resolve a submitted media value back to a bare filename whether it's
     * a genuinely new upload or the previously resolved full URL of an
     * unchanged item — used to match items across saves without being
     * fooled by the full-URL form.
     */
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
