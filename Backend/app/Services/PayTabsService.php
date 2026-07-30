<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PayTabsService
{
    private $api_url    = 'https://secure.paytabs.sa/payment/request'; // PayTabs base URL for Egypt
    private $verify_url = 'https://secure.paytabs.sa/payment/query';
    private $profile_id;
    private $server_key;

    public function __construct()
    {
        // Add your PayTabs credentials here
        $this->profile_id = env('PAYTABS_PROFILE_ID');
        $this->server_key = env('PAYTABS_SERVER_KEY');
    }

    public function createPayment(array $data)
    {
        // Prepare the data payload
        $payload = [
            "profile_id"       => $this->profile_id,
            "tran_type"        => "sale", // or 'auth' based on your preference
            "tran_class"       => "ecom",
            "cart_id"          => $data['cart_id'],
            "cart_currency"    => $data['currency'], // Example: 'USD'
            "cart_amount"      => $data['amount'],
            "cart_description" => $data['description'],
            "customer_details" => $data['customer_details'], // Full customer details (name, email, etc.)
            'shipping_details' => [
                'name' => auth('api')->user()->full_name . ' darf' ,
                'city' => 'Riyadh', // Fixed city
                'country' => 'SA', // Fixed country
                'state' => 'Riyadh', // Fixed state
                'street1' => 'Riyadh', // Fixed street address
                'zip' => '12211', // Fixed zip code
            ],
            'hide_shipping' => true,
            "return"           => $data['return'],
            "callback"         => $data['callback']
        ];
        // Make the HTTP POST request to PayTabs
        $response = Http::withHeaders([
            'authorization' => $this->server_key,
            'content-type'  => 'application/json'
        ])->post($this->api_url, $payload);
        
        return $response->json();
    }

    // Method to verify payment
    public function verifyPayment($transaction_ref)
    {
        // Prepare the data payload for verification
        $payload = [
            "profile_id" => $this->profile_id,
            "tran_ref"   => $transaction_ref
        ];

        // Make the HTTP POST request to PayTabs verification endpoint
        $response = Http::withHeaders([
            'authorization' => $this->server_key,
            'content-type'  => 'application/json'
        ])->post($this->verify_url, $payload);

        return $response->json();
    }
}
