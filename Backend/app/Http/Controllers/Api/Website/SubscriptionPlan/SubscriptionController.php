<?php

namespace App\Http\Controllers\Api\Website\SubscriptionPlan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlanUser;
use App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan\SubscriptionResource;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $subscriptions = SubscriptionPlanUser::where(['user_id' => auth('api')->id() ,'is_paid' => true])
        ->when(request()->from_date, function ($query) {
            $query->whereDate('created_at', '>=', request()->from_date);
        })->when(request()->to_date, function ($query) {
                $query->whereDate('created_at', '<=', request()->to_date);
        })->latest()->paginate($request->per_page);
        return SubscriptionResource::collection($subscriptions)->additional(['status' => 'success', 'message' => '']);
    }

    
}
