<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $order;
    public $user;
    private $title, $body;

    public function __construct($order)
    {
        $this->order = $order;
        $this->user = $order->user;
        $this->title = [
            'ar' => trans('You have new order', [], 'ar'),
            'en' => trans('You have new order', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('You have new order from :name', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('You have new order from :name', ['name' => $this->user->full_name], 'en'),
        ];
    }

    public function via($notifiable)
    {
        return ['database', 'fcm'];
    }

    public function toFcm($notifiable)
    {
        return [
            'notify_type' => 'new_order',
            'notify_id' => $this->order->id,
            'title' => $this->title,
            'body' => $this->body,
            'sender_data' => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }

    public function toArray($notifiable)
    {
        return [
            'notify_type' => 'new_order',
            'notify_id' => $this->order->id,
            'title' => $this->title,
            'body' => $this->body,
            'sender_data' => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }
}
