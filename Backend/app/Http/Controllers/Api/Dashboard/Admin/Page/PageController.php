<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Page;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Page\PageRequest;
use App\Http\Resources\Api\Dashboard\Admin\Page\{PageDetailsResource, PageResource};
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pages = Page::when($request->keyword, function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->whereTranslationLike('title', '%' . $request->keyword . '%');
            })->orWhere(function ($q) use ($request) {
                $q->whereTranslationLike('desc', '%' . $request->keyword . '%');
            });
        })->when($request->type, function ($query) use ($request) {
            $query->where('type', $request->type);
        })->latest()->paginate(25);

        return PageResource::collection($pages)->additional(['status' => 'success', 'message' => '']);
    }

    public function getPagesWithoutPagination()
    {
        $pages = Page::latest()->get();
        return PageResource::collection($pages)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(PageRequest $request)
    {
        $slider = Page::create($request->validated());
        return PageDetailsResource::make($slider)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $slider = Page::where('id', $id)->firstOrFail();
        return PageDetailsResource::make($slider)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PageRequest $request, $id)
    {
        $slider = Page::where('id', $id)->firstOrFail();
        $slider->update($request->validated());
        return PageDetailsResource::make($slider)->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $slider = Page::where('id', $id)->firstOrFail();
        if ($slider->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('Deleted successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('Something went wrong, please try again')], 422);
    }
}
