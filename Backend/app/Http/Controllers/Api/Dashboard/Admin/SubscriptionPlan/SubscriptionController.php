<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\SubscriptionPlan;

use Illuminate\Http\Request;
use App\Exports\ExportSubscribtion;
use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlanUser;
use Maatwebsite\Excel\Facades\Excel;
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
        $subscriptions = SubscriptionPlanUser::where('is_paid',true)->when($request->user_id, function ($q) use ($request) {
            $q->where('user_id', $request->user_id);
        })->when(request()->from_date, function ($query) {
            $query->whereDate('created_at', '>=', request()->from_date);
        })->when(request()->to_date, function ($query) {
                $query->whereDate('created_at', '<=', request()->to_date);
        })->latest()->paginate($request->per_page);
        return SubscriptionResource::collection($subscriptions)->additional(['status' => 'success', 'message' => '']);
    }

    public function export(Request $request)
    {
        $name = 'orders';
        $from = $request->from ? $request->from : '';
        $to = $request->to ? $request->to : '';
        return Excel::download(new ExportSubscribtion($from, $to), $name . '.xlsx');
    }

    
}
