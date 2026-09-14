<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\BlogsMainData;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\BlogsMainData\BlogsMainDataRequest;
use App\Http\Resources\Api\Dashboard\Admin\BlogsMainData\BlogsMainDataResource;
use App\Models\BlogsMainData;

class BlogsMainDataController extends Controller
{
    /**
     * Display the (single) blogs listing page's nav title + slug, creating
     * an empty one on first use since the dashboard always expects a
     * record to exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = BlogsMainData::first();

        if (!$data) {
            $data = BlogsMainData::create([
                'en' => ['nav_title' => ''],
                'ar' => ['nav_title' => ''],
            ]);
        }

        return BlogsMainDataResource::make($data)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the (single) blogs listing page's nav title + slug.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\BlogsMainData\BlogsMainDataRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(BlogsMainDataRequest $request)
    {
        $data = $request->validated();
        $model = BlogsMainData::first();

        $payload = [
            'en' => ['nav_title' => $data['nav_title_en']],
            'ar' => ['nav_title' => $data['nav_title_ar']],
            'slug' => $data['slug_en'],
        ];

        if (!$model) {
            $model = BlogsMainData::create($payload);
        } else {
            $model->update($payload);
        }

        return BlogsMainDataResource::make($model->fresh())
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }
}
