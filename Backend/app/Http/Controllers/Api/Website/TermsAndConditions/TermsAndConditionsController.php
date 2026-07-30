<?php

namespace App\Http\Controllers\Api\Website\TermsAndConditions;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Website\TermsAndConditions\TermsAndConditionsRequest;
use App\Http\Resources\Api\Website\TermsAndConditions\TermsAndConditionsResource;
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


  
}
