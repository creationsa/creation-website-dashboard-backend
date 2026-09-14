<?php

namespace App\Http\Controllers\Api\General;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Dashboard\Admin\CancelReason\CancelReasonResource;
use App\Http\Resources\Api\Dashboard\Admin\City\CityItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Governrate\GovernrateItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Region\SimpleRegionResource;
use App\Http\Resources\Api\Dashboard\Admin\Size\SizeResource;
use App\Models\{Region, City, Country, CancelReason, Governrate};
use App\Models\Size;

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

    public function governrates()
    {
        $governorates = Governrate::where('is_active', true)->when(request()->keyword, function ($query) {
            $query->whereTranslationLike('name', '%' . request()->keyword . '%');
        })->when(request()->country_id, function ($query) {
            $query->where('country_id', request()->country_id);
        })->get();

        return GovernrateItemResource::collection($governorates)->additional(['status' => 'success', 'message' => '']);
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

    public function regions()
    {
        $regions = Region::where('is_active', true)->when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('name', '%' . request()->keyword . '%')
                ->orWhereTranslationLike('slug', '%' . request()->keyword . '%');
            });
        })
        ->when(request()->city_id, function ($query) {
            $query->where('city_id', request()->city_id);
        })
        ->get();

        return SimpleRegionResource::collection($regions)->additional(['status' => 'success', 'message' => '']);
    }

    public function sizes()
    {
        $sizes = Size::when(request()->keyword, function ($query) {
            $query->whereTranslationLike('name', '%' . request()->keyword . '%');
        })->get();

        return SizeResource::collection($sizes)->additional(['status' => 'success', 'message' => '']);
    }

    public function settings()
    {
        $settings = [
            'subscription_price'    => (double) setting('subscription_price'),
            'subscription_duration' => (double) setting('subscription_duration'),
        ];

        return response()->json(['status' => 'success', 'data' => $settings, 'message' => '']);
    }

    public function goLogin()
    {
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('You must login first')], 401);
    }

    public function cancelReasons()
    {
        $cancel_reasons = CancelReason::when(request()->keyword, function ($query) {
            $query->whereTranslationLike('title', '%' . request()->keyword . '%');
        })->when(request()->type, function ($query) {
            $query->where('type', request()->type);
        })->latest()->paginate(10);

        return CancelReasonResource::collection($cancel_reasons)->additional(['status' => 'success', 'message' => '']);
    }
}
