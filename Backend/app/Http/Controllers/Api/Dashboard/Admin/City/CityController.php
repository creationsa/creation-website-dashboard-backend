<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\City;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\City\CityRequest;
use App\Http\Resources\Api\Dashboard\Admin\City\{CityResource,CityItemResource,CityDetailsResource};
use App\Models\{Country,City};
use Illuminate\Http\Request;



class CityController extends Controller
{

    public function indexWithoutPagination()
    {
        $cities = City::latest()->get();
        return CityResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
    }

    public function get_cities_names()
    {
        $cities = City::latest()->get('id');

        return CityItemResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cities = City::with('country')->when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->keyword . '%')
                ->orWhereTranslationLike('slug', '%' . $request->keyword . '%');
        })->latest()->paginate(25);

        return CityResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CityRequest $request)
    {
        $city = City::create($request->validated());
        return CityDetailsResource::make($city)->additional(['status' => 'success', 'message' => trans('api.messages.Created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $city = City::findOrFail($id);
        return CityResource::make($city)->additional(['status' => 'success', 'message' => '']);
    }

    public function getCitiesWithoutPagination()
    {
        $cities = City::with('country')->latest()->get();
        return CityResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CityRequest $request, $id)
    {
        $city = City::findOrFail($id);

        $city->update($request->validated());

        return CityDetailsResource::make($city)->additional(['status' => 'success', 'message' => trans('api.messages.updated_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $city = City::findOrFail($id);
        if ($city->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('api.messages.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
