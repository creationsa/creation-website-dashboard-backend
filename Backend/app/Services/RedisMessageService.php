<?php

namespace App\Services;

use App\Http\Resources\Api\App\Client\User\UserItemResource;
use App\Http\Resources\Api\App\Client\User\UserItemResource as UserUserItemResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class RedisMessageService
{
    public static function publish(Model $message)
    {
        $data = self::messageData($message);
        \Illuminate\Support\Facades\Redis::publish("chat-channel", json_encode($data));
    }

    public static function messageData(Model $message)
    {
        $chat_id = $message->chat->trip_id;

        return [
            "event" => "chat_" . $chat_id,
            "data"  => [
                "id"           => (int) $message->id,
                "user"         => UserUserItemResource::make($message->user),
                "message"      => $message->message,
                "message_type" => (string) $message->message_type,
                "created_at"   => $message->created_at?->timestamp,
            ]
        ];
    }
}
