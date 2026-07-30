<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Privacy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Privacy\PrivacyRequest;
use App\Http\Resources\Api\Dashboard\Admin\Privacy\PrivacyResource;
use App\Models\Privacy;
use Illuminate\Http\Request;

class PrivacyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $privacies = Privacy::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('title', '%' . $request->keyword . '%');
        })->latest()->paginate(25);
        return PrivacyResource::collection($privacies)->additional(['status' => 'success', 'message' => '']);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(PrivacyRequest $request)
    {
        $privacy = Privacy::create($request->validated());
        return PrivacyResource::make($privacy)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $privacy = Privacy::findOrFail($id);
        return PrivacyResource::make($privacy)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PrivacyRequest $request, $id)
    {
        $privacy = Privacy::findOrFail($id);
        $privacy->update($request->validated());

        return PrivacyResource::make($privacy)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $privacy = Privacy::findOrFail($id);
        if ($privacy->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
