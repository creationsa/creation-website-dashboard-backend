<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Category\CategoryRequest;
use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::with('subcategories')->when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->keyword . '%');
        })->latest()->paginate(25);
        return CategoryResource::collection($categories)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination()
    {
        $categories = Category::latest()->get();
        return CategoryResource::collection($categories)->additional(['status' => 'success', 'message' => '']);
    }

    /**Comment */

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return CategoryResource::make($category)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return CategoryResource::make($category)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->validated());

        return CategoryResource::make($category)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);

        if ($category->subcategories()->count() > 0) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard/admin.actions.cant_delete_this_item')], 422);
        }

        if ($category->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
