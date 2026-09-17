<?php

namespace App\Http\Controllers\Api\General;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Dashboard\Admin\City\CityItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Models\{City, Country};

class GeneralController extends Controller
{
    public function countries()
    {
        $countries = Country::where('is_active', true)->when(request()->keyword, function ($query) {
            $query->whereTranslationLike('name', '%' . request()->keyword . '%')
            ->orWhereTranslationLike('short_name', '%' . request()->keyword . '%')
            ->orWhereTranslationLike('nationality', '%' . request()->keyword . '%')
            ->orWhereTranslationLike('slug', '%' . request()->keyword . '%');
        })->get();

        return CountryItemResource::collection($countries)->additional(['status' => 'success', 'message' => '']);
    }

    public function cities()
    {
        $cities = City::when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('name', '%' . request()->keyword . '%');
            });
        })
        ->when(request()->country_id, function ($query) {
            $query->where('country_id', request()->country_id);
        })
        ->when(request()->governrate_id, function ($query) {
            $query->where('governrate_id', request()->governrate_id);
        })
        ->get();

        return CityItemResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
    }

    public function settings()
    {
        $settings = [
            'subscription_price'    => (double) setting('subscription_price'),
            'subscription_duration' => (double) setting('subscription_duration'),
        ];

        return $this->successResponse('', $settings);
    }

    public function goLogin()
    {
        return $this->errorResponse(trans('You must login first'), 401);
    }

}
