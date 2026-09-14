<?php

namespace App\Channels;

use App\Services\FcmService;
use Illuminate\Notifications\Notification;

class FcmChannel
{
    public function send($notifiable, Notification $notification)
    {
        info('Sending FCM notification');
        $deviceTokens = $notifiable->routeNotificationForFcm();

        if (empty($deviceTokens)) {
            return;
        }

        if (! $notifiable->allow_notification) {
            return;
        }

        $data = $notification->toFcm($notifiable);
        $locale = $notifiable->locale ?? app()->getLocale();

        foreach (['title', 'body'] as $key) {
            if (isset($data[$key]) && is_array($data[$key])) {
                $data[$key] = $data[$key][$locale] ?? $data[$key]['en'] ?? reset($data[$key]) ?: '';
            }
        }

        $response = FcmService::pushFcmNotes($data, $deviceTokens);

        return $response;
    }
}
