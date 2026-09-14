<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\City;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\City\CityRequest;
use App\Http\Resources\Api\Dashboard\Admin\City\CityDetailsResource;
use App\Http\Resources\Api\Dashboard\Admin\City\CityItemResource;
use App\Http\Resources\Api\Dashboard\Admin\City\CityResource;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function indexWithoutPagination()
    {
        $cities = City::with(['country', 'governrate'])->latest()->get();

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
        $cities = City::with(['country', 'governrate'])->when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%'.$request->keyword.'%')
                ->orWhereTranslationLike('slug', '%'.$request->keyword.'%');
        })
            ->when($request->country_id, function ($q) use ($request) {
                $q->where('country_id', $request->country_id);
            })
            ->when($request->governrate_id, function ($q) use ($request) {
                $q->where('governrate_id', $request->governrate_id);
            })
            ->latest()
            ->paginate(25);

        return CityDetailsResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
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

        // $city = City::create($request->validated());
        return CityDetailsResource::make($city)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $city = City::with(['country', 'governrate'])->findOrFail($id);

        return CityDetailsResource::make($city)->additional(['status' => 'success', 'message' => '']);
    }

    public function getCitiesWithoutPagination()
    {
        $cities = City::with(['country', 'governrate'])->latest()->get();

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

        return CityDetailsResource::make($city)->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
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
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('Deleted successfully')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('Something went wrong, please try again')], 422);
    }

    public function toggleActive($id)
    {
        $city = City::findOrFail($id);
        $city->update(['is_active' => ! $city->is_active]);

        return CityDetailsResource::make($city)->additional(['status' => 'success', 'message' => '']);
    }
}
