<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Blog\BlogRequest;
use App\Http\Resources\Api\Dashboard\Admin\Blog\{BlogResource,SimpleBlogResource,BlogPickerResource};
use App\Models\{Blog,Metadata};
use Illuminate\Http\Request;


class BlogController extends Controller
{
    /**
     * Lightweight listing used by the "pick an existing blog" toggle in
     * the pagesBuilder Home Blogs Teaser section — mirrors
     * ProjectController@picker / SolutionController@picker.
     *
     * @return \Illuminate\Http\Response
     */
    public function picker()
    {
        $blogs = Blog::latest()->get();

        return BlogPickerResource::collection($blogs)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->input('per_page', 10), 1), 100);
        $sortDirection = $request->input('sort') === 'asc' ? 'asc' : 'desc';

        $blogs = Blog::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('title', '%' . $request->keyword . '%')
                ->orWhereTranslationLike('slug', '%' . $request->keyword . '%');
        })
            ->orderBy('created_at', $sortDirection)
            ->paginate($perPage);

        return SimpleBlogResource::collection($blogs)->additional(['status' => 'success', 'message' => '']);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogRequest $request)
    {
        $blog = Blog::create($this->blogData($request));
        $blog->items()->createMany($request->items);
        $this->syncSlugs($blog, $request);

        return BlogResource::make($blog)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return BlogResource::make($blog)->additional(['status' => 'success', 'message' => '']);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BlogRequest $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $blog->update($this->blogData($request));
        $blog->items()->delete();
        $blog->items()->createMany($request->items);

        $this->syncSlugs($blog, $request);
        
        return BlogResource::make($blog)->additional(['status' => 'success', 'message' => trans('Updated Successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        if ($blog->delete()) {
            return $this->successResponse(trans('Deleted Successfully'));
        }
        return $this->errorResponse(trans('Failed to delete'));
    }

    private function blogData(BlogRequest $request): array
    {
        return \Arr::except($request->validated(), [
            'base_image',
            'base_image_alt',
            'cover_image',
            'cover_image_alt',
            'items',
        ]);
    }

    private function syncSlugs(Blog $blog, BlogRequest $request): void
    {
        $englishSlug = $request->validated('en.slug');

        if ($englishSlug === null) {
            return;
        }

        $slug = strtolower(str_replace(' ', '-', $englishSlug));

        $blog->update([
            'ar' => ['slug' => $slug],
            'en' => ['slug' => $slug],
        ]);
    }
}
