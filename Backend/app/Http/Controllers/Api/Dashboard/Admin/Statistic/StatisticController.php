<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Statistic;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{SecondSection, User, Slider, ThirdSection, HomeTemplate, SubscriptionPlanUser, Template};

class StatisticController extends Controller
{

    public function index(Request $request)
    {

        $data['subscribtions'] = SubscriptionPlanUser::where('is_paid', true)->when(request()->from_date, function ($query) {
            $query->whereDate('created_at', '>=', request()->from_date);
        })->when(request()->to_date, function ($query) {
            $query->whereDate('created_at', '<=', request()->to_date);
        })->count();

        $data['total_subscribtions'] = SubscriptionPlanUser::where('is_paid', true)->when(request()->from_date, function ($query) {
            $query->whereDate('created_at', '>=', request()->from_date);
        })->when(request()->to_date, function ($query) {
            $query->whereDate('created_at', '<=', request()->to_date);
        })->sum('total_price');

        $data['users'] = User::where('user_type', 'client')->when(request()->from_date, function ($query) {
            $query->whereDate('created_at', '>=', request()->from_date);
        })->when(request()->to_date, function ($query) {
            $query->whereDate('created_at', '<=', request()->to_date);
        })->count();

        $data['all_users'] = User::where('user_type', 'client')->count();


        return response()->json(['status' => 'success', 'data' => $data, 'message' => '']);
    }

}
