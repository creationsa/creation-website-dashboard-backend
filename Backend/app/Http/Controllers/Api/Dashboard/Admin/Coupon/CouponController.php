<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Coupon;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Coupon\CouponRequest;
use App\Http\Resources\Api\Dashboard\Admin\Coupon\{CouponResource};
use App\Models\{Coupon};
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $coupons =  Coupon::
        when($request->start_at, function ($query) use($request) {
            $query->whereDate('start_at', $request->start_at);
        })->when($request->end_at, function ($query) use($request) {
            $query->whereDate('end_at', $request->end_at);
        })
        ->when($request->code , function($q) use($request){
            $q->where('code','like' ,'%'.$request->code.'%');
        })->
        latest()->paginate();
        return CouponResource::collection($coupons)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CouponRequest $request)
    {
        $coupon = Coupon::create($request->validated());
        return CouponResource::make($coupon)->additional(['status' => 'success', 'message' => trans('dashboard/admin.messages.success_add')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $coupon = Coupon::findOrFail($id);
        return CouponResource::make($coupon)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CouponRequest $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
        try {
            $coupon->update($request->validated());
            return CouponResource::make($coupon)->additional(['status' => 'success', 'message' => trans('dashboard/admin.messages.success_update')]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('dashboard/admin.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id);
        if ($coupon->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('dashboard/admin.messages.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('dashboard/admin.messages.something_went_wrong_please_try_again')], 422);
    }
}
