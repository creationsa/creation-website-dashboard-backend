<?php

// namespace App\Http\Controllers\Api\Website\SubscriptionPlan;

// use Illuminate\Http\Request;

// use App\Models\{SubscriptionPlan};
// use App\Http\Controllers\Controller;
// use App\Models\SubscriptionPlanUser;
// use App\Http\Requests\Api\Client\Order\PaymentRequest;

// class PaymentController extends Controller
// {
//     public function store(Request $request)
//     {
//         // status => must be delivered
//         try {
//             $redirect_url = $request->redirect_url;
//             $data = [
//                 'profile_id'        =>  '106630',
//                 'tran_type'         =>  'sale',
//                 'tran_class'        =>  'ecom',
//                 'cart_id'           =>  'darf' . '-' . mt_rand(111111, 999999),
//                 'cart_description'  =>  'payment order online',
//                 'cart_currency'     =>  'SAR',
//                 'cart_amount'       =>  $request->amount,
//                 'website_link'      =>  'google.com',
//                 'callback'          =>  'https://google/' . $request->user_id, // front url
//                 'return'            =>  'https://darf-dev.wecreation.tech/api/website/check_payment/' . $request->user_id . '?redirect_url=' . $request->redirect_url,

//             ];
//             $response = \Http::withHeaders([
//                 'Accept'        => 'application/json',
//                 'Content-Type'  => 'application/json',
//                 'Authorization' => 'SWJNHGJ2M2-JHJRKBKWDT-LWKK2K2NTD',

//             ])->post('https://secure.paytabs.sa/payment/request', $data);
//             // return $response;
//             return response()->json(['status' => 'success', 'message' => trans('api.auth.sent_code_successfully'), 'data' => ['redirect_url' => $response['redirect_url']]], 200);
//         } catch (\Exception $e) {
//             dd($e);
//             return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('api.messages.something_went_wrong_please_try_again')], 500);
//         }
//     }

//     public function check(Request $request, $user_id)
//     {
//         $serverKey = "SWJNHGJ2M2-JHJRKBKWDT-LWKK2K2NTD";

//         $requestSignature = $request->input('signature');
//         $signatureFields = $request->except(['signature', 'redirect_url', 'user_id']);

//         $signatureFields = array_filter($signatureFields);

//         // Sort form fields
//         ksort($signatureFields);

//         // Generate URL-encoded query string of Post fields except the signature field.
//         $query = http_build_query($signatureFields);

//         $signature = hash_hmac('sha256', $query, $serverKey);

//         if ($signature && $requestSignature && hash_equals($signature, $requestSignature)) {
//             $data = [
//                 'profile_id' =>  '106630',
//                 'tran_ref'   => $request->tranRef,
//             ];

//             $response = \Http::withHeaders([
//                 'Accept'        => 'application/json',
//                 'Content-Type'  => 'application/json',
//                 'Authorization' => 'SWJNHGJ2M2-JHJRKBKWDT-LWKK2K2NTD'
//             ])->post('https://secure.paytabs.sa/payment/query', $data);

//             $cart = SubscriptionPlanUser::where('user_id', $user_id)->first();
            
//             if ($response->json(['payment_result'])['response_status'] == 'A') {
//                 $cart->update(['transaction_id' => $request->tranRef]);
//                 $url = $request->redirect_url . '&status=sucess';
//                 return redirect()->away($url);
//             }

//             $url = $request->redirect_url . '&status=fail';
            
//             return redirect()->away($url);
//         } else {
//             $url = $request->redirect_url . '&status=fail';
//             return redirect()->away($url);
//         }
//     }
// }

namespace App\Http\Controllers\Api\Website\SubscriptionPlan;

use App\Services\PayTabsService;
use App\Models\SubscriptionPlanUser;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Lcobucci\JWT\Token\Plain;

class PaymentController extends Controller
{
    protected $payTabs;

    public function __construct(PayTabsService $payTabs)
    {
        $this->payTabs = $payTabs;
    }

    public function createPayment(Request $request,$id)
    {
        $plan = SubscriptionPlan::find($id);
        $data = [
            'cart_id'     => 'darf' . '-' . mt_rand(111111, 999999),
            'currency'    => 'SAR',
            'amount'      => $plan->price,
            'description' => 'Test payment',
            'customer_details' => [
                'name'    => auth('api')->user()->full_name,
                'email'   => auth('api')->user()->email,
                'phone'   => auth('api')->user()->phone,
            ],
            // 'return_url'   => '',
            // 'callback_url' => 'https://www.google.com/' // env('APP_URL'). '/website/payment/callback?plan_id='.$plan->id,
        ];

        $payment = $this->payTabs->createPayment($data);

        if (isset($payment['redirect_url'])) {
            return redirect($payment['redirect_url']);
        }

        return response()->json(['status' => 'success','data' => $payment,'message' => '']);
    }

    // Callback and Return methods to handle PayTabs response
    public function callback(Request $request)
    {
        $user = auth('api')->user();
        $subscription_plan = SubscriptionPlan::find($request->plan_id);
        $transaction_ref = $request->input('tran_ref');  // Get transaction reference from the callback data
        $payment_status  = $this->payTabs->verifyPayment($transaction_ref);

        if ($payment_status['payment_result']['response_status'] == 'A') {

            $user->subscriptionPlanUsers()->update(['is_active' => false]);
            SubscriptionPlanUser::create(['user_id' => $user->id, 'subscription_plan_id' => $id, 'is_active' => true]);
            $user->increment('points', $subscription_plan->invetation_num);

            return response()->json(['message' => 'Payment verified successfully']);

        } else {
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

//     Route::get('/payment/create', [PaymentController::class, 'createPayment'])->name('payment.create');
//     Route::post('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');
//     Route::get('/payment/return', [PaymentController::class, 'return'])->name('payment.return');
}
