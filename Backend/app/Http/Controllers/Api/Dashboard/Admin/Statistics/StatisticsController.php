<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Statistics;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BuilderPage;
use App\Models\Client;
use App\Models\FooterSocialItem;
use App\Models\Project;
use App\Models\Solution;

class StatisticsController extends Controller
{
    /**
     * How many of each content type currently exist, and the 10
     * most recently updated items across all of them — the two
     * pieces the dashboard's landing page is built around.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $counts = [
            'projects' => Project::count(),
            'solutions' => Solution::count(),
            'blogs' => Blog::count(),
            'clients' => Client::first()?->logos()->count() ?? 0,
            'pages' => BuilderPage::count(),
            'social_links' => FooterSocialItem::count(),
        ];

        $recent = collect()
            ->concat($this->recentFrom(Project::class, 'project'))
            ->concat($this->recentFrom(Solution::class, 'solution'))
            ->concat($this->recentFrom(Blog::class, 'blog'))
            ->concat($this->recentFrom(BuilderPage::class, 'page'))
            ->sortByDesc('updated_at')
            ->take(10)
            ->values();

        return response()->json([
            'status' => 'success',
            'data' => ['counts' => $counts, 'recent' => $recent],
            'message' => '',
        ]);
    }

    /**
     * The last 10 updated rows of one translatable content type, shaped
     * the same way regardless of model so the frontend can render them
     * in a single merged list.
     *
     * @param  class-string  $model
     * @param  string  $type
     * @return \Illuminate\Support\Collection
     */
    private function recentFrom(string $model, string $type)
    {
        $locale = app()->getLocale();

        return $model::with('translations')
            ->latest('updated_at')
            ->take(10)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'type' => $type,
                'title' => $item->translate($locale)?->title,
                'updated_at' => $item->updated_at,
            ]);
    }
}
