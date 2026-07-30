<?php

namespace App\Http\Controllers\Api\Website\Privacy;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Privacy\PrivacyResource;
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $privacies = Privacy::findOrFail($id);
        return PrivacyResource::make($privacies)->additional(['status' => 'success', 'message' => '']);
    }
}
