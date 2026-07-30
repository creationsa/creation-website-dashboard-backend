<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\TermsAndConditions;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\TermsAndConditions\TermsAndConditionsRequest;
use App\Http\Resources\Api\Dashboard\Admin\TermsAndConditions\TermsAndConditionsResource;
use App\Models\TermsAndConditions;
use Illuminate\Http\Request;

class TermsAndConditionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $termsAndConditions = TermsAndConditions::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->keyword . '%');
        })->latest()->paginate(25);
        return TermsAndConditionsResource::collection($termsAndConditions)->additional(['status' => 'success', 'message' => '']);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(TermsAndConditionsRequest $request)
    {
        $termsAndConditions = TermsAndConditions::create($request->validated());
        return TermsAndConditionsResource::make($termsAndConditions)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $termsAndConditions = TermsAndConditions::findOrFail($id);
        return TermsAndConditionsResource::make($termsAndConditions)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TermsAndConditionsRequest $request, $id)
    {
        $termsAndConditions = TermsAndConditions::findOrFail($id);
        $termsAndConditions->update($request->validated());

        return TermsAndConditionsResource::make($termsAndConditions)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $termsAndConditions = TermsAndConditions::findOrFail($id);
        if ($termsAndConditions->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
