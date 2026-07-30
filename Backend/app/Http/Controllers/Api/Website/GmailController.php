<?php

namespace App\Http\Controllers\Api\Website;

use Google\Service\Gmail;
use Illuminate\Http\Request;
use Google\Service\Gmail\Message;
use Google\Client as GoogleClient;
use App\Http\Controllers\Controller;
use App\Services\GmailService;
use Illuminate\Support\Facades\Session;

class GmailController extends Controller
{
    protected $gmailService;
    public function __construct(GmailService $gmailService)
    {
        $this->gmailService = $gmailService;
    }
    // Redirect user to Google consent screen
    public function getClient()
    {
        $this->gmailService->getClient();
    }

    // Handle Google OAuth callback
    public function handleGoogleCallback(Request $request)
    {
        $this->gmailService->handleGoogleCallback($request->code);
        return 'Token saved successfully!';
    }

    // Send the email
    public function sendEmail()
    {
        // $this->gmailService->sendEmailViaGmailApi();
        return response()->json(['status' => 'success', 'message' => 'Email sent successfully!']);
    }
}
