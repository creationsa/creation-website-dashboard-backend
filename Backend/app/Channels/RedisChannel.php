<?php

namespace App\Channels;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Redis;
use Throwable;

class RedisChannel
{
    public function send($notifiable, Notification $notification)
    {
        if (! $notifiable->allow_notification) {
            return;
        }
        
        $data = $notification->toRedis($notifiable);

        try {
            return Redis::publish("private-notification", json_encode($data));
        } catch (Throwable $e) {
            info('Redis notification publish failed', [
                'notifiable_id' => $notifiable->id ?? null,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }
}
