<?php

namespace App\Http\Controllers\Api\Website\Project;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectsMainData;
use App\Support\ProjectMediaResolver;
use App\Support\SeoResolver;

class ProjectController extends Controller
{
    /**
     * The dashboard-managed intro copy for the /projects listing page
     * (a singleton row, same "Settings-style" pattern as About/Header/
     * Footer) — the page banner's own title/title-cut stay static since
     * there's no dashboard field for those.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function mainData()
    {
        $locale = app()->getLocale();
        $t = ProjectsMainData::first()?->translate($locale);

        return response()->json([
            'data' => [
                'first_title' => $t?->first_title,
                'second_title' => $t?->second_title,
                'third_title' => $t?->third_title,
                'overview_description' => $t?->overview_description,
            ],
            'status' => 'success',
            'message' => '',
        ]);
    }
    /**
     * The 10 media slots every project has, in gallery display order
     * (mainImage/aboutImage are exposed separately — see `resolve()`).
     */
    private const GALLERY_FIELDS = [
        'first_media', 'second_media', 'third_media', 'fourth_media',
        'fifth_media', 'sixth_media', 'seventh_media', 'eighth_media',
    ];

    /**
     * Deterministic ordering shared by the listing grid and the detail
     * page's prev/next lookup — plain `oldest()` alone ties on identical
     * timestamps (a real risk right after a batch import), which would
     * make the two disagree on order. Oldest-first so the first project
     * ever created is first in the list, and every new project appends
     * to the end.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function orderedQuery()
    {
        return Project::orderBy('created_at')->orderBy('id');
    }

    /**
     * The listing grid: one card per project, using whichever media slot
     * that project's dashboard record designates as its cover.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $locale = app()->getLocale();

        $projects = $this->orderedQuery()->with('media')->get()->map(function (Project $project) use ($locale) {
            $coverField = $project->cover_media_field ?: 'first_cover_media';

            return [
                'title' => $project->translate($locale)?->title,
                'slug' => $project->translate($locale)?->slug,
                'image' => ProjectMediaResolver::resolve($project, $coverField, $locale),
            ];
        });

        return response()->json(['data' => $projects, 'status' => 'success', 'message' => '']);
    }

    /**
     * Slugs only, for static param generation — mirrors Blog's
     * `only_slug` mode without needing the query-param toggle since
     * there's no pagination/search here to also support.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function slugs()
    {
        $slugs = Project::with('translations')->get()->map(fn (Project $project) => [
            'slug_en' => (string) $project->translate('en')?->slug,
            'slug_ar' => (string) $project->translate('ar')?->slug,
            'updated_at' => $project->updated_at?->toAtomString(),
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

        $project = Project::with(['media', 'tickerItems.translations', 'metadata.translations'])
            ->whereTranslation('slug', $slug)
            ->firstOrFail();

        $data = $this->resolve($project, $locale);
        $data['seo'] = $this->resolveSeo($project, $locale, $data);

        $adjacent = $this->adjacentProjects($project, $locale);
        $data['prev'] = $adjacent['prev'];
        $data['next'] = $adjacent['next'];

        return response()->json(['data' => $data, 'status' => 'success', 'message' => '']);
    }

    /**
     * The previous/next project relative to `$project`'s position in the
     * same order the listing grid uses, wrapping around at both ends —
     * computed here so the website never has to fetch the full list
     * itself just to figure out its neighbours.
     *
     * @param  \App\Models\Project  $project
     * @param  string  $locale
     * @return array{prev: array|null, next: array|null}
     */
    private function adjacentProjects(Project $project, string $locale): array
    {
        $orderedIds = $this->orderedQuery()->pluck('id')->all();
        $total = count($orderedIds);
        $currentIndex = array_search($project->id, $orderedIds, true);

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

    private function navItem(int $id, string $locale): ?array
    {
        $project = Project::with('media')->find($id);
        if (!$project) {
            return null;
        }

        $coverField = $project->cover_media_field ?: 'first_cover_media';

        return [
            'title' => $project->translate($locale)?->title,
            'slug' => $project->translate($locale)?->slug,
            'image' => ProjectMediaResolver::resolve($project, $coverField, $locale),
        ];
    }

    /**
     * This project's own SEO if one was saved, falling back — image and
     * keywords only — to the general "projects" category SEO from
     * Settings for whatever's left blank. Title/description instead fall
     * back to the project's own natural title/overview, since the
     * category-wide title wouldn't make sense repeated on every project.
     *
     * @param  \App\Models\Project  $project
     * @param  string  $locale
     * @param  array  $data  This project's already-resolved display data (for the natural fallback).
     * @return array
     */
    private function resolveSeo(Project $project, string $locale, array $data): array
    {
        return SeoResolver::resolve(
            $project->metadata,
            $locale,
            'projects',
            $data['title'],
            fn () => $data['overview_description'],
        );
    }

    /**
     * @param  \App\Models\Project  $project
     * @param  string  $locale
     * @return array
     */
    private function resolve(Project $project, string $locale): array
    {
        $t = $project->translate($locale);

        return [
            'title' => $t?->title,
            'slug' => $t?->slug,
            'first_title' => $t?->first_title,
            'second_title' => $t?->second_title,
            'third_title' => $t?->third_title,
            'overview_description' => $t?->overview_description,
            'main_image' => ProjectMediaResolver::resolve($project, 'first_cover_media', $locale),
            'about_image' => ProjectMediaResolver::resolve($project, 'second_cover_media', $locale),
            'gallery' => collect(self::GALLERY_FIELDS)
                ->map(fn ($field) => ProjectMediaResolver::resolve($project, $field, $locale))
                ->filter(fn ($media) => $media['file'])
                ->values(),
            'stats_title' => $t?->stats_title,
            'stats' => [
                ['label' => $t?->stat_one_label, 'value' => (string) $project->stat_one_value],
                ['label' => $t?->stat_two_label, 'value' => (string) $project->stat_two_value],
                ['label' => $t?->stat_three_label, 'value' => (string) $project->stat_three_value],
            ],
            'ticker_items' => $project->tickerItems
                ->map(fn ($item) => (string) $item->translate($locale)?->text)
                ->filter()
                ->values(),
        ];
    }

}
