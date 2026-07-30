<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\SubscriptionPlan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\SubscriptionPlan\SubscriptionPlanRequest;
use App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan\SubscriptionPlanResource;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $subscription_plans = SubscriptionPlan::when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('title', '%' . $request->keyword . '%');
        })->latest()->paginate(25);
        return SubscriptionPlanResource::collection($subscription_plans)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination()
    {
        $subscription_plans = SubscriptionPlan::latest()->get();
        return SubscriptionPlanResource::collection($subscription_plans)->additional(['status' => 'success', 'message' => '']);
    }

    /**Comment */

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(SubscriptionPlanRequest $request)
    {
        $subscription_plan = SubscriptionPlan::create($request->validated());
        if($request->features){
            $subscription_plan->planFeatures()->createMany($request->features);
        }
        return SubscriptionPlanResource::make($subscription_plan)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subscription_plan = SubscriptionPlan::findOrFail($id);
        return SubscriptionPlanResource::make($subscription_plan)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SubscriptionPlanRequest $request, $id)
    {
        $subscription_plan = SubscriptionPlan::findOrFail($id);
        $subscription_plan->update($request->validated());
        if ($request->features) {
            $subscription_plan->planFeatures()->delete();
            $subscription_plan->planFeatures()->createMany($request->features);
        }

        return SubscriptionPlanResource::make($subscription_plan)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subscription_plan = SubscriptionPlan::findOrFail($id);

        // if ($subscription_plan->users()->count() > 0) {
        //     return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard/admin.actions.cant_delete_this_item')], 422);
        // }

        if ($subscription_plan->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
