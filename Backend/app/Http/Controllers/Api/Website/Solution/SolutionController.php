<?php

namespace App\Http\Controllers\Api\Website\Solution;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Solution;
use App\Models\SolutionsMainData;
use App\Services\Website\AssetProxy;
use App\Support\ProjectMediaResolver;
use App\Support\SeoResolver;

class SolutionController extends Controller
{
    /**
     * Deterministic ordering shared by the listing grid and the detail
     * page's prev/next lookup — see Project\ProjectController for why a
     * secondary tiebreaker matters (identical timestamps right after a
     * batch import make plain `oldest()` disagree with itself). Oldest-
     * first so the first solution ever created is first in the list, and
     * every new solution appends to the end.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function orderedQuery()
    {
        return Solution::orderBy('created_at')->orderBy('id');
    }

    /**
     * The dashboard-managed intro copy for the /solutions listing page —
     * a singleton row (same pattern as ProjectsMainData), but richer: a
     * "What We Offer" items list, a marquee ticker, and an "Our DNA"
     * accordion with its own illustration/video.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function mainData()
    {
        $locale = app()->getLocale();

        $data = SolutionsMainData::with([
            'items.media', 'items.translations', 'items.project.media', 'items.project.translations',
            'tickerItems.translations',
            'accordionItems.translations',
            'media.translations',
        ])->first();

        if (!$data) {
            return response()->json(['data' => null, 'status' => 'success', 'message' => '']);
        }

        $t = $data->translate($locale);

        return response()->json([
            'data' => [
                'first_title' => $t?->first_title,
                'second_title' => $t?->second_title,
                'third_title' => $t?->third_title,
                'core_desc' => $t?->core_desc,
                'core_sub_desc' => $t?->core_sub_desc,

                'items_header' => [
                    'first_title' => $t?->items_header_first_title,
                    'second_title' => $t?->items_header_second_title,
                    'third_title' => $t?->items_header_third_title,
                ],
                // Each item is either manually curated or a live
                // reference to a Project (always its own image — the
                // dashboard never lets you pick a different one). Hide
                // anything still missing an image (a manual item not
                // finished yet, or a project item whose target project
                // was since deleted) rather than showing a broken card.
                'items' => $data->items
                    ->map(fn ($item) => $this->resolveMainDataItem($item, $locale))
                    ->filter(fn ($item) => $item && $item['image']['file'])
                    ->values(),

                'ticker_items' => $data->tickerItems
                    ->map(fn ($item) => (string) $item->translate($locale)?->text)
                    ->filter()
                    ->values(),

                'accordion_items_header' => [
                    'first_title' => $t?->accordion_items_header_first_title,
                    'second_title' => $t?->accordion_items_header_second_title,
                    'third_title' => $t?->accordion_items_header_third_title,
                ],
                'accordion_media' => $data->media->firstWhere('option', 'accordion_media')?->path,
                'accordion_media_poster' => $data->media->firstWhere('option', 'accordion_media_poster')?->path,
                'accordion_items' => $data->accordionItems->map(fn ($item) => [
                    'title' => $item->translate($locale)?->title,
                    'content_blocks' => collect($item->translate($locale)?->content_blocks ?? [])
                        ->map(fn ($block) => [
                            'subtitle' => $block['subtitle'] ?? null,
                            'description' => $block['description'] ?? '',
                        ])
                        ->values(),
                ]),
            ],
            'status' => 'success',
            'message' => '',
        ]);
    }

    /**
     * @param  \App\Models\SolutionMainDataItem  $item
     * @param  string  $locale
     * @return array|null
     */
    private function resolveMainDataItem($item, string $locale): ?array
    {
        if ($item->source === 'project') {
            $project = $item->project;
            if (!$project) {
                return null;
            }

            $field = $item->project_media_field ?: ($project->feature_media_field ?: 'first_cover_media');

            return [
                'title' => $project->translate($locale)?->title,
                // Prefixed so the website can link to it with the exact
                // same `/${locale}/${slug}` it already uses for a custom
                // item's free-form slug — a real project always lives
                // under /projects/, a custom item can point anywhere.
                'slug' => 'projects/' . $project->translate($locale)?->slug,
                'image' => ProjectMediaResolver::resolve($project, $field, $locale),
            ];
        }

        return [
            'title' => $item->translate($locale)?->item_title,
            'slug' => $item->item_slug,
            'image' => $this->resolveOwnMedia($item->media, 'feature_media', $locale),
        ];
    }

    /**
     * Same "don't assume it's an image" fix as `ProjectMediaResolver`, but
     * for a model's own media relation (a `SolutionMainDataItem`'s own
     * upload) instead of a referenced Project's — the poster convention
     * (`{option}_poster`) is identical either way.
     *
     * @param  \Illuminate\Support\Collection  $mediaCollection
     * @param  string  $option
     * @param  string  $locale
     * @return array{type: string, file: ?string, poster: ?string, alt: ?string}
     */
    private function resolveOwnMedia($mediaCollection, string $option, string $locale): array
    {
        $media = $mediaCollection->firstWhere('option', $option);

        if (!$media) {
            return ['type' => 'image', 'file' => null, 'poster' => null, 'alt' => null];
        }

        $isVideo = $media->media_type === 'video';

        return [
            'type' => $isVideo ? 'video' : 'image',
            'file' => $media->path,
            'poster' => $isVideo
                ? $mediaCollection->firstWhere('option', $option . '_poster')?->path
                : null,
            'alt' => $media->translate($locale)?->alt,
        ];
    }

    /**
     * The listing grid: one card per solution, cover = its first gallery
     * item's image (same convention as the dashboard's own SolutionResource).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $locale = app()->getLocale();

        $solutions = $this->orderedQuery()->with(['items.media', 'items.project.media', 'media'])->get()->map(function (Solution $solution) use ($locale) {
            $firstItem = $solution->items->sortBy('id')->first();
            $icon = $solution->media->firstWhere('option', 'card_icon');

            return [
                'title' => $solution->translate($locale)?->title,
                'slug' => $solution->translate($locale)?->slug,
                'image' => $firstItem ? $this->resolveItemImage($firstItem, $locale) : null,
                'small_description' => $solution->translate($locale)?->small_description,
                // Inlined client-side (react-inlinesvg) the same way Client
                // logos are, so it needs the same CORS-safe proxy URL.
                'icon' => $icon ? AssetProxy::url($icon->path) : null,
            ];
        });

        return response()->json(['data' => $solutions, 'status' => 'success', 'message' => '']);
    }

    /**
     * The media for one gallery item, whether it's a manual upload or a
     * live reference to a Project (always that project's own media) —
     * either way it's returned as `{type, file, poster}`, never assumed
     * to be an image, since either source can just as well be a video.
     * Still `null` (not an empty-looking object) when there's genuinely
     * nothing to show, so the existing `->filter()`/ternary call sites
     * keep dropping missing items exactly as before.
     *
     * @param  \App\Models\SolutionItem  $item
     * @return array{type: string, file: ?string, poster: ?string}|null
     */
    private function resolveItemImage($item, string $locale): ?array
    {
        if ($item->source === 'project') {
            $project = $item->project;
            if (!$project) {
                return null;
            }

            $field = $item->project_media_field ?: ($project->feature_media_field ?: 'first_cover_media');

            $media = ProjectMediaResolver::resolve($project, $field, $locale);
        } else {
            $media = $this->resolveOwnMedia($item->media, 'feature_media', $locale);
        }

        return $media['file'] ? $media : null;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function slugs()
    {
        $slugs = Solution::with('translations')->get()->map(fn (Solution $solution) => [
            'slug_en' => (string) $solution->translate('en')?->slug,
            'slug_ar' => (string) $solution->translate('ar')?->slug,
            'updated_at' => $solution->updated_at?->toAtomString(),
        ]);

        return response()->json(['data' => $slugs, 'status' => 'success', 'message' => '']);
    }

    /**
     * @param  string  $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($slug)
    {
        $locale = app()->getLocale();

        $solution = Solution::with(['items.media', 'items.project.media', 'executionKeys.translations', 'tickerItems.translations', 'metadata.translations'])
            ->whereTranslation('slug', $slug)
            ->firstOrFail();

        $data = $this->resolve($solution, $locale);
        $data['seo'] = $this->resolveSeo($solution, $locale, $data);

        $adjacent = $this->adjacentSolutions($solution, $locale);
        $data['prev'] = $adjacent['prev'];
        $data['next'] = $adjacent['next'];

        return response()->json(['data' => $data, 'status' => 'success', 'message' => '']);
    }

    private function resolve(Solution $solution, string $locale): array
    {
        $t = $solution->translate($locale);

        return [
            'title' => $t?->title,
            'slug' => $t?->slug,
            'first_title' => $t?->first_title,
            'second_title' => $t?->second_title,
            'third_title' => $t?->third_title,
            'proposition_title' => $t?->proposition_title,
            'proposition_desc' => $t?->proposition_desc,
            'small_description' => $t?->small_description,
            'execution_title' => $t?->execution_title,
            'execution_keys' => $solution->executionKeys->map(fn ($key) => [
                'label' => $key->translate($locale)?->label,
                'value' => $key->translate($locale)?->value,
            ]),
            'gallery' => $solution->items
                ->sortBy('id')
                ->map(fn ($item) => $this->resolveItemImage($item, $locale))
                ->filter()
                ->values(),
            'ticker_items' => $solution->tickerItems
                ->map(fn ($item) => (string) $item->translate($locale)?->text)
                ->filter()
                ->values(),
        ];
    }

    /**
     * @param  \App\Models\Solution  $solution
     * @param  string  $locale
     * @return array{prev: array|null, next: array|null}
     */
    private function adjacentSolutions(Solution $solution, string $locale): array
    {
        $orderedIds = $this->orderedQuery()->pluck('id')->all();
        $total = count($orderedIds);
        $currentIndex = array_search($solution->id, $orderedIds, true);

        if ($currentIndex === false || $total < 2) {
            return ['prev' => null, 'next' => null];
        }

        $prevId = $orderedIds[($currentIndex - 1 + $total) % $total];
        $nextId = $orderedIds[($currentIndex + 1) % $total];

        return [
            'prev' => $this->navItem($prevId, $locale),
            'next' => $this->navItem($nextId, $locale),
        ];
    }

    /**
     * Text-only by design — the original static navigation never showed
     * an image for solutions, only the title.
     */
    private function navItem(int $id, string $locale): ?array
    {
        $solution = Solution::find($id);
        if (!$solution) {
            return null;
        }

        return [
            'title' => $solution->translate($locale)?->title,
            'slug' => $solution->translate($locale)?->slug,
        ];
    }

    /**
     * Same fallback contract as Project\ProjectController::resolveSeo() —
     * image/keywords only fall back to the general "solutions" category
     * SEO from Settings; title/description fall back to this solution's
     * own natural title/summary instead.
     *
     * @param  \App\Models\Solution  $solution
     * @param  string  $locale
     * @param  array  $data
     * @return array
     */
    private function resolveSeo(Solution $solution, string $locale, array $data): array
    {
        return SeoResolver::resolve(
            $solution->metadata,
            $locale,
            'solutions',
            $data['title'],
            fn () => $data['small_description'],
        );
    }
}
