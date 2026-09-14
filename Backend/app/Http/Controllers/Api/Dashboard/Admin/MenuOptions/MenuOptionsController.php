<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\MenuOptions;

use App\Http\Controllers\Controller;
use App\Models\BlogsMainData;
use App\Models\BuilderPage;
use App\Models\ProjectsMainData;
use App\Models\SolutionsMainData;

class MenuOptionsController extends Controller
{
    /**
     * Every linkable menu destination — builder pages plus the three
     * singleton main-data pages — resolved server-side into the same
     * {type, id, title, slug} shape the dashboard's menu picker (and,
     * separately, MenuItemResolver on the website side) both expect.
     * A singleton is omitted while its nav_title/slug isn't filled in
     * yet, matching MenuItemResolver's own behaviour on the website.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = BuilderPage::with('translations')->get()->map(fn ($page) => [
            'type' => 'page',
            'id' => $page->id,
            'title' => (string) $page->title,
            'slug' => (string) $page->slug,
        ]);

        $fixedOptions = collect([
            ['type' => 'projects', 'model' => ProjectsMainData::first()],
            ['type' => 'solutions', 'model' => SolutionsMainData::first()],
            ['type' => 'blogs', 'model' => BlogsMainData::first()],
        ])
            ->filter(fn ($option) => $option['model'] && $option['model']->nav_title && $option['model']->slug)
            ->map(fn ($option) => [
                'type' => $option['type'],
                'id' => null,
                'title' => (string) $option['model']->nav_title,
                'slug' => (string) $option['model']->slug,
            ])
            ->values();

        return response()->json([
            'data' => $pages->concat($fixedOptions)->values(),
            'status' => 'success',
            'message' => '',
        ]);
    }
}
