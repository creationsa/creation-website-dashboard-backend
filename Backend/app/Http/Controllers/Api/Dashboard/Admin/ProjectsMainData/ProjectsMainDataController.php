<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\ProjectsMainData;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\ProjectsMainData\ProjectsMainDataRequest;
use App\Http\Resources\Api\Dashboard\Admin\ProjectsMainData\ProjectsMainDataResource;
use App\Models\ProjectsMainData;

class ProjectsMainDataController extends Controller
{
    /**
     * Display the (single) projects landing page intro, creating an empty
     * one on first use since the dashboard always expects a record to exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ProjectsMainData::first();

        if (!$data) {
            $emptyLocale = ['first_title' => '', 'second_title' => '', 'third_title' => '', 'overview_description' => '', 'nav_title' => ''];
            $data = ProjectsMainData::create([
                'en' => $emptyLocale,
                'ar' => $emptyLocale,
            ]);
        }

        return ProjectsMainDataResource::make($data)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the (single) projects landing page intro.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\ProjectsMainData\ProjectsMainDataRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectsMainDataRequest $request)
    {
        $data = $request->validated();
        $model = ProjectsMainData::first();

        $payload = [
            'en' => [
                'first_title' => $data['first_title_en'],
                'second_title' => $data['second_title_en'],
                'third_title' => $data['third_title_en'],
                'overview_description' => $data['overview_description_en'],
                'nav_title' => $data['nav_title_en'],
            ],
            'ar' => [
                'first_title' => $data['first_title_ar'],
                'second_title' => $data['second_title_ar'],
                'third_title' => $data['third_title_ar'],
                'overview_description' => $data['overview_description_ar'],
                'nav_title' => $data['nav_title_ar'],
            ],
            'slug' => $data['slug_en'],
        ];

        if (!$model) {
            $model = ProjectsMainData::create($payload);
        } else {
            $model->update($payload);
        }

        return ProjectsMainDataResource::make($model->fresh())
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }
}
