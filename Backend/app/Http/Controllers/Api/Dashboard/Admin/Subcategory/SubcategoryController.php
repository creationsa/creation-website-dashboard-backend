<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Subcategory;

use App\Models\AppMedia;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Subcategory\SubcategoryRequest;
use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Subcategory::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->keyword . '%');
        })->latest()->paginate(25);
        return SubcategoryResource::collection($categories)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination($category_id)
    {
        $subcategories = Subcategory::where('category_id', $category_id)->latest()->get();
        return SubcategoryResource::collection($subcategories)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(SubcategoryRequest $request)
    {
        $category = Category::findOrFail($request->category_id);
        $subcategory = Subcategory::create($request->validated()+['type' => $category->type]);
        return SubcategoryResource::make($subcategory)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subcategory = Subcategory::findOrFail($id);
        return SubcategoryResource::make($subcategory)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SubcategoryRequest $request, $id)
    {
        \Log::info('Update method called');
        $subcategory = Subcategory::findOrFail($id);
        $subcategory->update($request->validated());

        // Updating media
        if (request()->has('big_image') && isset(request()->big_image) && request()->big_image != null) {
            if ($subcategory->media()->exists()) {
                $big_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image', 'option' => 'big_image'])->first();
                if ($big_image) {
                    if (file_exists(storage_path('app/public/images/subcategories/' . $big_image->media))) {
                        \File::delete(storage_path('app/public/images/subcategories/' . $big_image->media));
                    }
                    $big_image->delete();
                }
            }
        }

        $subcategory->media()->create(['media' => request()->big_image, 'media_type' => 'image', 'option' => 'big_image']);

        if (request()->has('small_image') && isset(request()->small_image) && request()->small_image != null) {
            if ($subcategory->media()->exists()) {
                $small_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image', "option" => "small_image"])->first();
                if ($small_image) {
                    if (file_exists(storage_path('app/public/images/subcategories/' . $small_image->media))) {
                        \File::delete(storage_path('app/public/images/subcategories/' . $small_image->media));
                    }
                    $small_image->delete();
                }
            }
        }
        $subcategory->media()->create(['media' => request()->small_image, 'media_type' => 'image', 'option' => 'small_image']);

        return SubcategoryResource::make($subcategory)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subcategory = Subcategory::findOrFail($id);
        if ($subcategory->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
