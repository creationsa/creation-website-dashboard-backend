<?php

namespace App\Http\Controllers\Api\Website\Blog;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Blog\BlogResource;
use App\Http\Resources\Api\Website\Blog\SimpleBlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $perPage = min(max($request->integer('per_page', 15), 1), 100);

        $blogs = Blog::with('translations')
            ->when($request->filled('keyword'), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->whereTranslationLike('title', '%' . $request->keyword . '%')
                        ->orWhereTranslationLike('slug', '%' . $request->keyword . '%');
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return SimpleBlogResource::collection($blogs)->additional([
            'status'  => 'success',
            'message' => '',
        ]);
    }

    /**
     * Every blog's slug pair, unpaginated — for static param generation
     * and the sitemap, neither of which should silently drop posts past
     * page one the way the old `only_slug` query-param mode on `index()`
     * did. Mirrors Project/Solution's own `slugs()`.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function slugs()
    {
        $slugs = Blog::with('translations')->get()->map(fn (Blog $blog) => [
            'slug_en' => (string) $blog->translate('en')?->slug,
            'slug_ar' => (string) $blog->translate('ar')?->slug,
            'updated_at' => $blog->updated_at?->toAtomString(),
        ]);

        return response()->json(['data' => $slugs, 'status' => 'success', 'message' => '']);
    }

    public function show($slug)
    {
        $blog = Blog::with(['translations', 'items.translations'])
            ->whereTranslation('slug', $slug)
            ->firstOrFail();

        $blog->setRelation('relatedBlogs', $this->nextBlogs($blog));

        return BlogResource::make($blog)->additional([
            'status'  => 'success',
            'message' => '',
        ]);
    }

    private function nextBlogs(Blog $blog)
    {
        $nextBlogs = Blog::with(['translations'])
            ->where(function ($query) use ($blog) {
                $query->where('created_at', '<', $blog->created_at)
                    ->orWhere(function ($query) use ($blog) {
                        $query->where('created_at', $blog->created_at)
                            ->where('id', '<', $blog->id);
                    });
            })
            ->limit(2)
            ->get();

        if ($nextBlogs->count() < 2) {
            $wrapBlogs = Blog::with(['translations'])
                ->where('id', '!=', $blog->id)
                ->whereNotIn('id', $nextBlogs->pluck('id'))
                ->limit(2 - $nextBlogs->count())
                ->get();

            $nextBlogs = $nextBlogs->concat($wrapBlogs);
        }

        return $nextBlogs->values();
    }

    public function getHomeBlogs()
    {
        $blogs = Blog::with(['translations'])
            ->where('show_in_home', true)
            ->latest()
            ->limit(2)
            ->get();

        return SimpleBlogResource::collection($blogs)->additional([
            'status'  => 'success',
            'message' => '',
        ]);
    }

    public function seoBlog(Request $request)
    {
        $seo_blog = $request->header('Accept-Language') == 'ar' ? setting('seo_blog_ar') : setting('seo_blog_en');

        return response()->json([
            'status' => 'success',
            'message' => '',
            'data' => $seo_blog ? $seo_blog : ''

        ]);
    }
}
