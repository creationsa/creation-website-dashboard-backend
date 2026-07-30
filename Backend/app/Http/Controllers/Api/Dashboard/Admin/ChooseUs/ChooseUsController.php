<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\ChooseUs;

use App\Models\AppMedia;
use App\Models\ChooseUs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\ChooseUs\ChooseUsRequest;
use App\Http\Resources\Api\Dashboard\Admin\ChooseUs\ChooseUsResource;

class ChooseUsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $ChooseUs = ChooseUs::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('title', '%' . $request->keyword . '%');
        })->latest()->get();
        return ChooseUsResource::collection($ChooseUs)->additional(['status' => 'success', 'message' => '']);
    }

    /**Comment */

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ChooseUsRequest $request)
    {
        $choose = ChooseUs::create($request->validated());
        // foreach($request->choose_us as $choose_us){
        //     if($choose_us['media'] && $choose_us['media'] != null){
        //         if ($choose->media()->exists()) {
        //             $image = AppMedia::where(['app_mediaable_type' => 'App\Models\ChooseUs', 'app_mediaable_id' => $choose->id, 'media_type' => 'image', 'option' => 'choose_us'])->first();
        //             if ($image) {
        //                 if (file_exists(storage_path('app/public/images/choose_us/' . $image->media))) {
        //                     \File::delete(storage_path('app/public/images/choose_us/' . $image->media));
        //                 }
        //                 $image->delete();
        //             }
        //         }
        //         $choose->media()->create(['media' => $choose_us['media'], 'media_type' => 'image', 'option' => 'choose_us']);
        //     }

        // }
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $chooseus = ChooseUs::findOrFail($id);
        return ChooseUsResource::make($chooseus)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ChooseUsRequest $request, $id)
    {
        $chooseus = ChooseUs::findOrFail($id);
        $chooseus->update($request->validated());

        return ChooseUsResource::make($chooseus)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $choose_us = ChooseUs::findOrFail($id);

        if ($choose_us->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
