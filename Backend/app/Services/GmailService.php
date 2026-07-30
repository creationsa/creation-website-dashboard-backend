<?php

namespace App\Services;

use Google\Client as GoogleClient;
use Google\Service\Gmail;
use Google\Service\Gmail\Message;
use Illuminate\Support\Facades\Storage;

class GmailService
{
    protected $client;
    protected $service;

    public function getClient(){
        $client = new GoogleClient();
        $client->setAuthConfig(storage_path('app/credentials.json'));
        $client->setRedirectUri(env('API_URL').'/api/website/gmail/callback');
        $client->addScope(Gmail::GMAIL_SEND);
        $client->setAccessType('offline');
        $client->setPrompt('consent');
        return redirect()->away($client->createAuthUrl());
    }

    public function handleGoogleCallback($code)
    {
        $client = new GoogleClient();
        $client->setAuthConfig(storage_path('app/credentials.json'));
        $client->setRedirectUri(env('API_URL').'/api/website/gmail/callback');
        $client->addScope(Gmail::GMAIL_SEND);
        $client->setAccessType('offline');
        $client->setPrompt('consent');

        ;

        $token = $client->fetchAccessTokenWithAuthCode($code);

        // ✅ Save token with refresh token
        Storage::put('gmail-token.json', json_encode($token));

        return 'Token saved successfully!';
    }

    public function sendEmailViaGmailApi($email, $htmlBody, $subject)
    {
        $client = new GoogleClient();
        $client->setAuthConfig(storage_path('app/credentials.json'));
        $client->addScope(Gmail::GMAIL_SEND);
        $client->setAccessType('offline');

        $token = json_decode(Storage::get('gmail-token.json'), true);
        $client->setAccessToken($token);

        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            Storage::put('gmail-token.json', json_encode($client->getAccessToken()));
        }

        $gmail = new Gmail($client);

        $rawMessage = "From: me\r\n";
        $rawMessage .= "To: $email\r\n";
        $rawMessage .= "Subject: $subject\r\n";
        $rawMessage .= "MIME-Version: 1.0\r\n";
        $rawMessage .= "Content-Type: text/html; charset=utf-8\r\n\r\n";
        $rawMessage .= $htmlBody;

        $encoded = rtrim(strtr(base64_encode($rawMessage), '+/', '-_'), '=');

        $message = new Message();
        $message->setRaw($encoded);

        $gmail->users_messages->send('me', $message);

        return '✅ Email sent!';
    }
}
