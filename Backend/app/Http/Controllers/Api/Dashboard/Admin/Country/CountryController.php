<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Country;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Country\CountryRequest;
use App\Http\Resources\Api\Dashboard\Admin\Country\{GetCountryCitiesResource,CountryDetailsResource,CountryItemResource,CountryResource};
use App\Models\{Country,User};
use Illuminate\Http\Request;

class CountryController extends Controller
{

    public function indexWithoutPagination()
    {
        $countries = Country::latest()->get();
        return CountryResource::collection($countries)->additional(['status' => 'success', 'message' => '']);
    }

    public function get_countries_names()
    {
        $countries = Country::latest()->get('id');
        return CountryItemResource::collection($countries)->additional(['status' => 'success', 'message' => '']);
    }

    public function getCities(Country $country)
    {
        return GetCountryCitiesResource::collection($country->cities()->latest()->paginate(25))->additional(['status' => 'success', 'message' => '']);
    }

    public function getCitiesByCountryWithoutPagination(Country $country)
    {
        return GetCountryCitiesResource::collection($country->cities)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $countries = Country::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->keyword . '%')
                ->orWhereTranslationLike('nationality', '%' . $request->keyword . '%')
                ->orWhereTranslationLike('currency', '%' . $request->keyword . '%')
                ->orWhereTranslationLike('slug', '%' . $request->keyword . '%');
        })->latest()->paginate(25);
        return CountryResource::collection($countries)->additional(['status' => 'success', 'message' => '']);
    }
    
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CountryRequest $request)
    {
        $country = Country::create($request->validated());
        return CountryDetailsResource::make($country)->additional(['status' => 'success', 'message' => trans('api.messages.Created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $country = Country::findOrFail($id);
        return CountryResource::make($country)->additional(['status' => 'success', 'message' => '']);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CountryRequest $request, $id)
    {
        $country = Country::findOrFail($id);

        if ($request->phone_code && $request->phone_code != null && $request->phone_code != $country->phone_code) {
            User::where('phone_code', $country->phone_code)->update(['phone_code' => $request->phone_code]);
        }

        $country->update($request->validated());
        
        return CountryDetailsResource::make($country)->additional(['status' => 'success', 'message' => trans('api.messages.updated_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $country = Country::findOrFail($id);
        if ($country->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('api.messages.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
