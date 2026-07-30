<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Faq;

use Illuminate\Http\Request;
use App\Models\Faq;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Faq\FaqRequest;
use App\Http\Resources\Api\Dashboard\Admin\Faq\FaqResource;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $faqs = Faq::latest()->paginate(request()->per_page ?? 10);
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
        
        return FaqResource::make($faq)->additional(['status' => 'success', 'message' => trans('dashboard.messages.success_add')]);
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
        return FaqResource::make($faq)->additional(['status' => 'success', 'message' => trans('dashboard.messages.success_update')]);
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
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('dashboard.messages.success_delete')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('dashboard.messages.something_went_wrong_please_try_again')], 422);
    }

    
}
