<?php

namespace App\Services;

class OtpService
{
    public static function generateCode()
    {
        if (env('OTP_PRODUCTION_MODE', false)) {
            return rand(1000, 9999);
        }

        return '1111';
    }
}
