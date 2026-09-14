<?php

namespace App\Http\Controllers\Api\Website\PageBuilder;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BuilderPage;
use App\Models\Project;
use App\Models\Solution;
use App\Services\Website\LogoResolver;
use App\Support\PageSectionMedia;
use App\Support\ProjectMediaResolver;

class BuilderPageController extends Controller
{
    private const BLOGS_TEASER_TYPE = 'blogs_teaser_section';
    private const FEATURED_WORKS_TYPE = 'featured_works_section';
    private const DISPLAY_INFO_TYPE = 'display_info_section';
    private const CULTURE_IDENTITY_TYPE = 'culture_identity_section';

    public function homeBlogsTeaser()
    {
        $locale = app()->getLocale();

        $page = BuilderPage::where('is_home', true)->first();
        $section = $page
            ? collect($page->sections ?? [])->first(fn ($section) => ($section['type'] ?? null) === self::BLOGS_TEASER_TYPE)
            : null;

        if (!$section) {
            return response()->json(['data' => null, 'status' => 'success', 'message' => '']);
        }

        $content = $section['content'] ?? [];

        $items = collect($content['items'] ?? [])
            ->map(fn ($item) => $this->resolveBlogsTeaserItem($item, $locale))
            ->filter()
            ->values();

        $data = [
            'header' => [
                'first_title' => $content["first_title_{$locale}"] ?? '',
                'second_title' => $content["second_title_{$locale}"] ?? '',
                'third_title' => $content["third_title_{$locale}"] ?? '',
            ],
            'button' => [
                'title' => $content["button_title_{$locale}"] ?? '',
                'slug' => $content['button_slug_en'] ?? '',
            ],
            'items' => $items,
        ];

        return response()->json(['data' => $data, 'status' => 'success', 'message' => '']);
    }

    public function slugs()
    {
        $slugs = BuilderPage::where('is_home', false)
            ->get(['slug', 'updated_at'])
            ->map(fn (BuilderPage $page) => [
                'slug' => $page->slug,
                'updated_at' => $page->updated_at?->toAtomString(),
            ]);

        return response()->json(['data' => $slugs, 'status' => 'success', 'message' => '']);
    }

    public function show($slug)
    {
        $locale = app()->getLocale();

        $page = BuilderPage::with('metadata.translations')->where('slug', $slug)->firstOrFail();

        $sections = collect($page->sections ?? [])
            ->map(fn ($section) => $this->resolveSection($section, $locale))
            ->values();

        $ownMetadataT = $page->metadata?->translate($locale);

        $data = [
            'title' => $page->translate($locale)?->title,
            'slug' => $page->slug,
            'is_home' => (bool) $page->is_home,
            'sections' => $sections,
            'seo' => [
                'title' => $ownMetadataT?->title ?: $page->translate($locale)?->title,
                'description' => $ownMetadataT?->description ?: '',
                'image' => $ownMetadataT?->image,
                'image_alt' => $ownMetadataT?->image_alt,
                'image_type' => $ownMetadataT?->image_type,
                'keywords' => $page->metadata?->keywords,
            ],
        ];

        return response()->json(['data' => $data, 'status' => 'success', 'message' => '']);
    }

    private function resolveSection(array $section, string $locale): array
    {
        $type = $section['type'] ?? null;
        $content = $section['content'] ?? [];

        if ($type === self::BLOGS_TEASER_TYPE) {
            $content['items'] = collect($content['items'] ?? [])
                ->map(fn ($item) => $this->resolveBlogsTeaserItem($item, $locale))
                ->filter()
                ->values()
                ->all();
        }

        if ($type === self::FEATURED_WORKS_TYPE) {
            $content['items'] = collect($content['items'] ?? [])
                ->map(fn ($item) => $this->resolveFeaturedWorkItem($item, $locale))
                ->filter()
                ->values()
                ->all();
        }

        if ($type === self::DISPLAY_INFO_TYPE) {
            $content['blocks'] = collect($content['blocks'] ?? [])
                ->map(fn ($block) => $this->resolveDisplayInfoBlock($block, $locale))
                ->values()
                ->all();
        }

        $content = PageSectionMedia::resolveUrls($content);
        $content = $this->flattenLocale($content, $locale);

        if ($type === self::CULTURE_IDENTITY_TYPE) {
            [$logoUrl, $logoAlt] = LogoResolver::resolve();
            $content['logo'] = ['url' => $logoUrl, 'alt' => $logoAlt];
        }

        return ['type' => $type, 'content' => $content];
    }

    private function flattenLocale($node, string $locale)
    {
        if (!is_array($node)) {
            return $node;
        }

        $result = [];

        foreach ($node as $key => $value) {
            if (is_string($key) && (str_ends_with($key, '_en') || str_ends_with($key, '_ar'))) {
                $base = substr($key, 0, -3);
                if (array_key_exists($base, $result)) {
                    continue;
                }
                $result[$base] = $node["{$base}_{$locale}"] ?? $node["{$base}_en"] ?? $value;
                continue;
            }

            $result[$key] = $this->flattenLocale($value, $locale);
        }

        return $result;
    }

    /**
     * Same shape as the real Blogs listing (`SimpleBlogResource`) either
     * way — a "blog" item is the live model itself; a "custom" item gets
     * an equivalent `base_image` object built from its own feature media,
     * so the Website can treat every teaser item exactly like a real blog
     * reference regardless of where it actually came from.
     */
    private function resolveBlogsTeaserItem(array $item, string $locale): ?array
    {
        if (($item['source'] ?? null) === 'blog') {
            $blog = Blog::find($item['blog_id'] ?? null);
            if (!$blog) {
                return null;
            }

            return [
                'id' => $blog->id,
                'title' => $blog->translate($locale)?->title,
                'slug' => $blog->translate($locale)?->slug,
                'base_image' => $blog->base_image_object,
                'created_at' => $blog->created_at
                    ? \Carbon\Carbon::parse($blog->created_at)->format('Y-m-d h:i A')
                    : null,
            ];
        }

        $media = PageSectionMedia::resolveUrls($item['feature_media'] ?? null);

        return [
            'id' => null,
            'title' => $item["item_title_{$locale}"] ?? '',
            'slug' => $item['item_slug_en'] ?? null,
            'base_image' => [
                'id' => null,
                'media' => $media['file'] ?? null,
                'alt' => $media["alt_{$locale}"] ?? '',
                'en' => ['alt' => $media['alt_en'] ?? ''],
                'ar' => ['alt' => $media['alt_ar'] ?? ''],
            ],
            'created_at' => $item['applied_at'] ?? null,
        ];
    }

    private function resolveFeaturedWorkItem(array $item, string $locale): ?array
    {
        if (($item['source'] ?? null) === 'project') {
            $project = Project::with('media')->find($item['project_id'] ?? null);
            if (!$project) {
                return null;
            }

            $field = ($item['project_media_field'] ?? null) ?: ($project->feature_media_field ?: 'first_cover_media');

            return [
                'title' => $project->translate($locale)?->title,
                'slug' => 'projects/' . $project->translate($locale)?->slug,
                'image' => ProjectMediaResolver::resolve($project, $field, $locale),
            ];
        }

        $media = PageSectionMedia::resolveUrls($item['feature_media'] ?? null);

        return [
            'title' => $item["item_title_{$locale}"] ?? '',
            'slug' => $item['item_slug_en'] ?? null,
            'image' => [
                'type' => $media['type'] ?? 'image',
                'file' => $media['file'] ?? null,
                'poster' => $media['poster'] ?? null,
                'alt' => $media["alt_{$locale}"] ?? null,
            ],
        ];
    }

    private function resolveDisplayInfoBlock(array $block, string $locale): array
    {
        return [
            'left' => $this->resolveDisplayInfoLeft($block, $locale),
            'first_right' => $this->resolveDisplayInfoCard($block, 'first_right', $locale),
            'second_right' => $this->resolveDisplayInfoCard($block, 'second_right', $locale),
            'first_right_card_desc' => $block["first_right_card_desc_{$locale}"] ?? '',
            'second_right_card_desc' => $block["second_right_card_desc_{$locale}"] ?? '',
        ];
    }

    private function resolveDisplayInfoLeft(array $block, string $locale): array
    {
        $buttonLabel = $block["left_btn_{$locale}"] ?? '';

        if (($block['left_source'] ?? null) === 'solution') {
            $solution = Solution::find($block['left_solution_id'] ?? null);
            if (!$solution) {
                return ['title' => '', 'description' => '', 'slug' => null, 'button_label' => $buttonLabel];
            }

            return [
                'title' => $solution->translate($locale)?->title,
                'description' => $solution->translate($locale)?->small_description,
                'slug' => 'solutions/' . $solution->translate($locale)?->slug,
                'button_label' => $buttonLabel,
            ];
        }

        return [
            'title' => $block["left_title_{$locale}"] ?? '',
            'description' => $block["left_desc_{$locale}"] ?? '',
            'slug' => $block['left_btn_slug'] ?? null,
            'button_label' => $buttonLabel,
        ];
    }

    private function resolveDisplayInfoCard(array $block, string $prefix, string $locale): array
    {
        if (($block["{$prefix}_source"] ?? null) === 'project') {
            $project = Project::with('media')->find($block["{$prefix}_project_id"] ?? null);
            if (!$project) {
                return ['title' => '', 'slug' => null, 'image' => null];
            }

            $field = ($block["{$prefix}_project_media_field"] ?? null) ?: ($project->feature_media_field ?: 'first_cover_media');

            return [
                'title' => $project->translate($locale)?->title,
                'slug' => 'projects/' . $project->translate($locale)?->slug,
                'image' => ProjectMediaResolver::resolve($project, $field, $locale),
            ];
        }

        $media = PageSectionMedia::resolveUrls($block["{$prefix}_media"] ?? null);

        return [
            'title' => $block["{$prefix}_card_title_{$locale}"] ?? '',
            'slug' => $block["{$prefix}_slug"] ?? null,
            'image' => [
                'type' => $media['type'] ?? 'image',
                'file' => $media['file'] ?? null,
                'poster' => $media['poster'] ?? null,
                'alt' => $media["alt_{$locale}"] ?? null,
            ],
        ];
    }
}
