<?php

namespace App\Http\Controllers\Api\Website\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\Api\Dashboard\Admin\Category\CategoryResource;
use App\Models\Subcategory;
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
        $categories = Category::with('subcategories')->where('type', '!=', 'private')
            ->when($request->query('keyword'), function ($q) use ($request) {
                $q->whereTranslationLike('name', '%' . $request->query('keyword') . '%');
            })
            ->when($request->query('category_id'), function ($q) use ($request) {
                $q->where('id', $request->query('category_id'));
            })
            ->latest()->paginate(25);

        return CategoryResource::collection($categories)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found',
            ], 404);
        }

        $subcategories = Subcategory::where('event_category_id', $id)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'category' => $category,
                'subcategories' => $subcategories,
            ],
        ], 200);
    }
}
