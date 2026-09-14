<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Static;

use Exception;
use Illuminate\Http\Request;
use App\Models\Faq;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Static\FaqRequest;
use App\Http\Resources\Api\Dashboard\Admin\Static\FaqResource;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $faqs = Faq::when($request->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('title', '%' . request()->keyword . '%')
                      ->orWhereTranslationLike('desc', '%' . request()->keyword . '%');
            });
        })
        ->latest()->paginate(request()->per_page ?? 10);
        return FaqResource::collection($faqs)->additional(['status' => 'success', 'message' => '',]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FaqRequest $request)
    {
        $faq = Faq::create($request->validated()) ;
        
        return FaqResource::make($faq)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $faq = Faq::findOrFail($id);
        return FaqResource::make($faq)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FaqRequest $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $faq->update($request->validated()) ;
        return FaqResource::make($faq)->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);

        if ($faq->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('Deleted successfully')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('Something went wrong please try again')], 422);
    }

    
}
