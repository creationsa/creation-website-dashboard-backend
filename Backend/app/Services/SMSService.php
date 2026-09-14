<?php

namespace App\Services;

use TaqnyatSms;

class SMSService
{
    public static function sendVerificationCode($phone, $code)
    {
        $bearer     = "2c07078476c2c9fcb4e3ca24c353f9fe";

        $taqnyt     = new TaqnyatSms($bearer);

        $body       = "Your OTP is: " . $code . " Don't share it with others.";
        $recipients = [$phone];
        $sender     = '6DiRu.Co';

        $message    = $taqnyt->sendMsg($body, $recipients, $sender);

        info($message);
        info($body);
    }
}
