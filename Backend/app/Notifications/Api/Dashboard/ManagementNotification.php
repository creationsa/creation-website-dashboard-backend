<?php

namespace App\Notifications\Api\Dashboard;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ManagementNotification extends Notification // implements ShouldBroadcast
{
    use Queueable;

    public $data, $via;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, array $via)
    {
        $this->via  = $via;
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return $this->via;
    }

    public function toFcm($notifiable)
    {
        return [
            'notify_type'   => isset($this->data['notify_type']) ? $this->data['notify_type'] : 'management',
            'notify_id'     => null,
            'notify_status' => null,
            'title'         => isset($this->data['title']) ? $this->data['title'][$notifiable->locale ?? 'en'] : null,
            'body'          => isset($this->data['body']) ? $this->data['body'][$notifiable->locale ?? 'en'] : null,
            'sender_data'   => isset($this->data['sender_data']) ? $this->data['sender_data'] : null,
        ];
    }

    public function toRedis($notifiable)
    {
        return [
            "event" => "notification:" . $notifiable->id,
            'data'  => [
                'notify_type'   => isset($this->data['notify_type']) ? $this->data['notify_type'] : 'management',
                'notify_id'     => null,
                'notify_status' => null,
                'title'         => isset($this->data['title']) ? $this->data['title'][$notifiable->locale ?? 'en'] : null,
                'body'          => isset($this->data['body']) ? $this->data['body'][$notifiable->locale ?? 'en'] : null,
                'sender_data'   => isset($this->data['sender_data']) ? $this->data['sender_data'] : null,
            ]
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */

    public function toDatabase($notifiable)
    {
        return [
            'notify_type'   => $this->data['notify_type'] ?? 'management',
            'notify_id'     => null,
            'notify_status' => null,
            'title'         => $this->data['title'] ?? [],
            'body'          => $this->data['body'] ?? [],
            'sender_data'   => $this->data['sender_data'] ?? null,
        ];
    }
    public function toArray($notifiable)
    {
        return $this->toDatabase($notifiable);
    }
}
