<?php

namespace App\Http\Controllers\Api\Website\SubscriptionPlan;

use App\Models\User;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Services\PayTabsService;
use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlanUser;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Requests\Api\Website\SubscriptionPlan\SubscribeRequest;
use App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan\SubscriptionPlanResource;

class SubscriptionPlanController extends Controller
{

    protected $payTabs;

    public function __construct(PayTabsService $payTabs)
    {
        $this->payTabs = $payTabs;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index(Request $request)
    {
        $subscription_plans = SubscriptionPlan::latest()->get();
        return SubscriptionPlanResource::collection($subscription_plans)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function checkout(Request $request, $id)
    {
        $subscription_plan = SubscriptionPlan::findOrFail($id);
        $discount = 0;
        $vat_price = /* ($subscription_plan->price * 15) / 100 */ 0;
        $total_price = $vat_price + $subscription_plan->price;
        if($request->coupon){
            $coupon = $this->applyCoupon($request->coupon, $subscription_plan->price);
            $discount = $coupon['discount'];
            $vat_price = $coupon['vat_price'];
            $total_price = $coupon['total_price'];
        }
        return SubscriptionPlanResource::make($subscription_plan)->additional(['price' => (int) $subscription_plan->price, 'discount' => $discount, 'vat_price' => $vat_price, 'total_price' => $total_price, 'status' => 'success', 'message' => '']);
    }

    public function Subscripe(SubscribeRequest $request, $id)
    {
        $user = auth()->user();
        $subscription_plan = SubscriptionPlan::findOrFail($id);

        $coupon_id = null;
        $discount = 0;
        $discount_type = null;
        $vat_price = /* ($subscription_plan->price * 15) / 100 */ 0;
        $total_price = $vat_price + $subscription_plan->price;
        if ($request->coupon) {
            $coupon = $this->applyCoupon($request->coupon, $subscription_plan->price);
            $coupon_id = $coupon['coupon_id'];
            $discount = $coupon['discount'];
            $vat_price = $coupon['vat_price'];
            $total_price = $coupon['total_price'];
            $discount_type = $coupon['discount_type'];
        }
        $data = [
            'cart_id'     => 'darf' . '-' . mt_rand(111111, 999999),
            'currency'    => 'SAR',
            'amount'      => $total_price,
            'description' => 'Test payment',
            'customer_details' => [
                'name'    => $user->full_name,
                'email'   => $user->email,
                'phone'   => $user->phone,
                'address'   => $user->full_name,
                'city' => 'Riyadh', // Default or hidden city
                'country' => 'SA', // Default or hidden country code (e.g., AE for UAE)
                'state' => 'Riyadh', // Default or hidden state
                'street1' => 'Riyadh', // Default or hidden street address
                'zip' => '12211', // Default or hidden zip code
            ],
            "return"           => env('API_URL').'/api/website/payment/callback/' . $subscription_plan->id . '?user_id=' . $user->id, // Return URL after payment
            "callback"         => env('API_URL').'/api/website/payment/return/' . $subscription_plan->id.'?user_id='.$user->id, // Callback URL for post-payment
        ];

        $payment = $this->payTabs->createPayment($data);

        if (isset($payment['redirect_url'])) {
            $subscription = SubscriptionPlanUser::create($request->validated() + [
                'user_id' => $user->id, 
                'subscription_plan_id' => $id, 
                'is_paid' => false, 
                'transaction_id' => $payment['tran_ref'],
                'price'=> $subscription_plan->price,
                'vat_price' => $vat_price,
                'total_price' => $total_price,
                'coupon_id' => $coupon_id,
                'discount_type' => $discount_type,
                'discount' => $discount,
            ]);
            $subscription->fresh();
            return response()->json(['status' => 'success', 'data' => $payment['redirect_url'],'message' => '']);
        }
        
        // return SubscriptionPlanResource::make($subscription_plan)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    public function callback(Request $request,$id)
    {
        $user = User::find($request->user_id);
        $subscription_plan = SubscriptionPlan::find($id);
        $subscription_user = SubscriptionPlanUser::where(['user_id' => $request->user_id, 'subscription_plan_id' => $id, 'is_active' => false, 'is_paid' => false])->latest('id')->first();
        $transaction_ref = $subscription_user->transaction_id;  // Get transaction reference from the callback data
        $payment_status  = $this->payTabs->verifyPayment($transaction_ref);

        if ($payment_status && $payment_status['payment_result']['response_status'] == 'A') {

            $user->subscriptionPlanUsers()->update(['is_active' => false]);
            $subscription_user->update(['is_paid' => true, 'is_active' => true]);
            $user->increment('points', $subscription_plan->invetation_num);

            return redirect()->away('https://www.darf.co/plans');
        } else {
            info('Payment verification failed', ['response' => $payment_status]);
            return response()->json(['message' => 'Payment verification failed']);
        }
    }

    public function return(Request $request)
    {
        // Handle the return URL data
        $payment_data = $request->all();

        // Process and redirect user based on the status
        if ($payment_data['payment_status'] == 'completed') {
            return redirect()->route('home')->with('success', 'Payment completed');
        } else {
            return redirect()->route('home')->with('error', 'Payment failed');
        }
    }

    public static function applyCoupon($code, $total_price)
    {
        $user = auth('api')->user();
        $coupon = Coupon::where(['code' => $code, 'is_active' => true])->where(function ($q) {
            $q->where('start_at', '<=', now())
            ->where('end_at', '>=', now());
        })->firstOr(function () {
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.invalid_coupon')], 422));
        });

        if ($user->subscriptionPlanUsers()->where('coupon_id', $coupon->id)->count() == $coupon->max_used_for_user) {
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.invalid_coupon')], 422));
        }
        if ($coupon->used_num == $coupon->max_used_num) {
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.invalid_coupon')], 422));
        }
        $discount = $coupon->discount_amount;
        if ($coupon->discount_type == 'percentage') {
            $discount = ($coupon->discount_amount / 100) * $total_price;
            if ($coupon->max_discount && $discount >= $coupon->max_discount) $discount = $coupon->max_discount;
        }
        $vat = /* (($total_price - $discount) * 15) / 100 */ 0;
        return [
            'price'         => $total_price,
            'discount'      => $discount,
            'discount_type' => $coupon->discount_type,
            'coupon_id'     => $coupon->id,
            'vat_price'     => $vat,
            'total_price'   => ($total_price - $discount) + $vat,
        ];
    }
}
