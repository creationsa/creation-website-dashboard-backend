<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class NewDriverNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $driver;
    private $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($driver)
    {
        $this->driver = $driver;
        $this->title = [
            'ar' => trans('New driver has been added', [], 'ar'),
            'en' => trans('New driver has been added', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('New driver has been added, please review his data', ['name' => auth('api')->user()->full_name], 'ar'),
            'en' => trans('New driver has been added, please review his data', ['name' => auth('api')->user()->full_name], 'en'),
        ];
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'fcm'];
    }

    public function toFcm($notifiable)
    {
        return [
            'notify_type'   => 'new_driver',
            'notify_id'     => $this->driver->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->driver->only(['id', 'full_name', 'avatar']),
        ];
    }

    public function realTime($notifiable)
    {
        $fcm_data = [
            "event" => 'DashboardNotification',
            "data"  => [
                'notify_type'   => 'new_driver',
                'notify_id'     => $this->driver->id,
                //'notify_status' => $this->notify_status,
                'title'         => $this->title[app()->getLocale()],
                'body'          => $this->body[app()->getLocale()],
                'sender_data'   => $this->driver->only(['id', 'full_name', 'avatar']),
            ]
        ];

        Redis::publish("private-notification", json_encode($fcm_data));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $fcm_data = [
            "event" => 'DashboardNotification',
            "data"  => [
                'notify_type'   => 'new_driver',
                'notify_id'     => $this->driver->id,
                //'notify_status' => $this->notify_status,
                'title'         => $this->title[app()->getLocale()],
                'body'          => $this->body[app()->getLocale()],
                'sender_data'   => $this->driver->only(['id', 'full_name', 'avatar']),
            ]
        ];

        Redis::publish("private-notification", json_encode($fcm_data));
        return [
            'notify_type'   => "new_driver",
            'notify_id'     => $this->driver->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->driver->only(['id', 'full_name', 'avatar']),
        ];
    }
}
