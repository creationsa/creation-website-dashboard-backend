<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\About;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\About\AboutRequest;
use App\Http\Resources\Api\Dashboard\Admin\About\{AboutIndexResource, AboutResource};
use App\Models\About;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $about = About::when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('name', '%' . request()->keyword . '%')
                    ->orWhereTranslationLike('slug', '%' . request()->keyword . '%')
                    ->orWhereTranslationLike('desc', '%' . request()->keyword . '%');
            });
        })
            ->when(isset(request()->is_active), function ($query) {
                $query->where('is_active', request()->is_active);
            })
            ->when(request()->date, function ($query) {
                $query->whereDate('created_at', request()->date);
            })
            ->when(request()->from_date, function ($query) {
                $query->whereDate('created_at', '>=', request()->from_date);
            })
            ->when(request()->to_date, function ($query) {
                $query->whereDate('created_at', '<=', request()->to_date);
            })
            ->latest()
            ->paginate();

        return AboutIndexResource::collection($about)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination()
    {
        $about = About::when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('name', '%' . request()->keyword . '%')
                    ->orWhereTranslationLike('slug', '%' . request()->keyword . '%')
                    ->orWhereTranslationLike('desc', '%' . request()->keyword . '%');
            });
        })
            ->when(isset(request()->is_active), function ($query) {
                $query->where('is_active', request()->is_active);
            })
            ->when(request()->date, function ($query) {
                $query->whereDate('created_at', request()->date);
            })
            ->when(request()->from_date, function ($query) {
                $query->whereDate('created_at', '>=', request()->from_date);
            })
            ->when(request()->to_date, function ($query) {
                $query->whereDate('created_at', '<=', request()->to_date);
            })
            ->latest()
            ->get();

        return AboutIndexResource::collection($about)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AboutRequest $request)
    {
        $about = About::create(\Arr::except($request->validated(), ['images']));
        return AboutResource::make($about)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $about = About::findOrFail($id);
        return AboutResource::make($about)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AboutRequest $request, $id)
    {
        $about = About::findOrFail($id);
        $about->update($request->validated());

        $main_image = $about->media()->where('option', 'main_image')->first();
        $main_image->update($request->main_image);

        foreach ($request->images as $image) {
            $media = $about->media()->where('id', $image['id'])->first();

            if ($media) {
                $media->update($image);
            } else {
                $about->media()->create($image + ['media_type' => 'image']);
            }
        }

        return AboutResource::make($about)->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $about = About::findOrFail($id);
        $about->delete();
        return response()->json(['status' => 'success', 'message' => trans('Deleted successfully')]);
    }
}
