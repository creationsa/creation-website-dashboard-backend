<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class OrderStatusNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $order;
    public $driver;
    public $event;
    private $title;
    private $body;

    public function __construct($order, string $event = 'status_updated')
    {
        $this->order = $order;
        $this->driver = $order->driver;
        $this->event = $event;

        $titleKey = $event === 'accepted'
            ? 'Order accepted successfully'
            : 'Order status updated successfully';

        $this->title = [
            'ar' => trans($titleKey, [], 'ar'),
            'en' => trans($titleKey, [], 'en'),
        ];

        $this->body = [
            'ar' => trans(
                'Order #:number is now :status',
                ['number' => $order->order_number, 'status' => $this->statusLabel('ar')],
                'ar'
            ),
            'en' => trans(
                'Order #:number is now :status',
                ['number' => $order->order_number, 'status' => $this->statusLabel('en')],
                'en'
            ),
        ];
    }

    public function via($notifiable)
    {
        return ['database', 'fcm'];
    }

    public function toFcm($notifiable)
    {
        return [
            'notify_type' => $this->event === 'accepted' ? 'order_accepted' : 'order_status_updated',
            'notify_id' => $this->order->id,
            'notify_status' => $this->order->status,
            'title' => $this->title,
            'body' => $this->body,
            'sender_data' => $this->driver?->only(['id', 'full_name', 'avatar']),
        ];
    }

    public function toArray($notifiable)
    {
        return [
            'notify_type' => $this->event === 'accepted' ? 'order_accepted' : 'order_status_updated',
            'notify_id' => $this->order->id,
            'notify_status' => $this->order->status,
            'title' => $this->title,
            'body' => $this->body,
            'sender_data' => $this->driver?->only(['id', 'full_name', 'avatar']),
        ];
    }

    private function statusLabel(string $locale): string
    {
        $translated = trans($this->order->status_translation, [], $locale);
        if ($translated !== $this->order->status_translation) {
            return $translated;
        }

        return Str::of((string) $this->order->status_translation)->replace('_', ' ')->title()->toString();
    }
}
