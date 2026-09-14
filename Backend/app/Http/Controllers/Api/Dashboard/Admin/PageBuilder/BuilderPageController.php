<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\PageBuilder;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\PageBuilder\BuilderPageRequest;
use App\Http\Resources\Api\Dashboard\Admin\PageBuilder\{BuilderPageResource, BuilderPageShowResource};
use App\Models\BuilderPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BuilderPageController extends Controller
{
    /**
     * `sections` is a fully generic JSON blob (see the class-level docs on
     * `BuilderPage`) — the backend otherwise has zero awareness of any
     * individual section's shape. This one type is the sole exception:
     * its items carry an `applied_at` date that must be set by the server
     * the moment an item is created and left untouched on every later
     * save, never accepted from the dashboard.
     */
    private const BLOGS_TEASER_TYPE = 'blogs_teaser_section';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->input('per_page', 10), 1), 100);
        $sortDirection = $request->input('sort') === 'asc' ? 'asc' : 'desc';

        $pages = BuilderPage::when($request->keyword, function ($query) use ($request) {
            $query->whereTranslationLike('title', '%' . $request->keyword . '%');
        })
            ->orderBy('created_at', $sortDirection)
            ->paginate($perPage);

        return BuilderPageResource::collection($pages)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\PageBuilder\BuilderPageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BuilderPageRequest $request)
    {
        $data = $request->validated();

        if (!empty($data['sections'])) {
            $data['sections'] = $this->stampBlogsTeaserAppliedAt($data['sections']);
        }

        $page = DB::transaction(function () use ($data) {
            if (!empty($data['is_home'])) {
                $this->clearPreviousHomePages();
            }

            return BuilderPage::create($data);
        });

        return BuilderPageShowResource::make($page)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $page = BuilderPage::findOrFail($id);

        return BuilderPageShowResource::make($page)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\PageBuilder\BuilderPageRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BuilderPageRequest $request, $id)
    {
        $page = BuilderPage::findOrFail($id);
        $data = $request->validated();

        if (!empty($data['sections'])) {
            $data['sections'] = $this->stampBlogsTeaserAppliedAt($data['sections'], $page->sections ?? []);
        }

        DB::transaction(function () use ($data, $page) {
            if (!empty($data['is_home'])) {
                $this->clearPreviousHomePages($page->id);
            }

            $page->update($data);
        });

        return BuilderPageShowResource::make($page->fresh())->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Stamp `applied_at` on every blogs-teaser item, entirely server-side.
     *
     * `sections` is replaced wholesale on every save (there's no per-item
     * table to persist an id against), so the only way to tell "this item
     * already existed" from "this item is brand new" across saves is the
     * opaque `id` each item optionally carries: one assigned here the
     * first time an item is saved, then echoed back by the dashboard on
     * every later save untouched. A match by `id` keeps that item's
     * original `applied_at`; anything unmatched (no `id` yet, or an `id`
     * that doesn't exist in the previous version of this page) is treated
     * as new and stamped with today's date.
     *
     * @param  array  $sections  The incoming sections about to be saved.
     * @param  array  $previousSections  The page's sections before this save (empty on create).
     * @return array
     */
    private function stampBlogsTeaserAppliedAt(array $sections, array $previousSections = []): array
    {
        $previousItemsById = [];
        foreach ($previousSections as $section) {
            if (($section['type'] ?? null) !== self::BLOGS_TEASER_TYPE) {
                continue;
            }

            foreach ($section['content']['items'] ?? [] as $item) {
                if (!empty($item['id'])) {
                    $previousItemsById[$item['id']] = $item;
                }
            }
        }

        foreach ($sections as &$section) {
            if (($section['type'] ?? null) !== self::BLOGS_TEASER_TYPE) {
                continue;
            }

            // PHP can't bind a `foreach (... as &$x)` reference through a
            // `??` fallback expression — it would silently iterate a
            // throwaway copy instead of the real nested array. Pulling it
            // into a plain variable first, then writing it back after the
            // loop, keeps the mutations from being lost.
            $items = $section['content']['items'] ?? [];
            foreach ($items as &$item) {
                $existing = !empty($item['id']) ? ($previousItemsById[$item['id']] ?? null) : null;

                if ($existing) {
                    $item['applied_at'] = $existing['applied_at'];
                } else {
                    $item['id'] = $item['id'] ?? (string) Str::uuid();
                    $item['applied_at'] = now()->toDateString();
                }
            }
            unset($item);
            $section['content']['items'] = $items;
        }
        unset($section);

        return $sections;
    }

    /**
     * Unmark any other page currently flagged as home. The dashboard
     * always assigns the exact slug "home" to whichever page is home, so
     * that slug has to be reclaimed from the outgoing page too — otherwise
     * the incoming page's save fails on the slug's unique constraint.
     *
     * @param  int|null  $exceptId
     * @return void
     */
    private function clearPreviousHomePages(?int $exceptId = null): void
    {
        $query = BuilderPage::where('is_home', true);
        if ($exceptId) {
            $query->where('id', '!=', $exceptId);
        }

        foreach ($query->get() as $previousHome) {
            $previousHome->is_home = false;
            if ($previousHome->slug === 'home') {
                $previousHome->slug = 'page-' . $previousHome->id;
            }
            $previousHome->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = BuilderPage::with('metadata')->findOrFail($id);

        $page->metadata?->delete();
        $page->delete();

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('Deleted successfully')]);
    }
}
