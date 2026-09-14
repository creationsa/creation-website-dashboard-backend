<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class CancelTripToAdminNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $trip;
    public $user;
    private $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($trip)
    {
        $this->trip = $trip;
        $this->user = $trip->driver;
        $this->title = [
            'ar' => trans('The Trip has been cancelled', [], 'ar'),
            'en' => trans('The Trip has been cancelled', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('Please assign new driver, The Trip has been cancelled from :name', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('Please assign new driver, The Trip has been cancelled from :name', ['name' => $this->user->full_name], 'en'),
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
            'notify_type'   => 'cancel_trip',
            'notify_id'     => $this->trip->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }

    public function realTime($notifiable)
    {
        $fcm_data = [
            "event" => 'DashboardNotification',
            "data"  => [
                'notify_type'   => 'cancel_trip',
                'notify_id'     => $this->trip->id,
                //'notify_status' => $this->notify_status,
                'title'         => $this->title[app()->getLocale()],
                'body'          => $this->body[app()->getLocale()],
                'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
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
                'notify_type'   => 'cancel_trip',
                'notify_id'     => $this->trip->id,
                //'notify_status' => $this->notify_status,
                'title'         => $this->title[app()->getLocale()],
                'body'          => $this->body[app()->getLocale()],
                'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
            ]
        ];

        Redis::publish("private-notification", json_encode($fcm_data));
        return [
            'notify_type'   => "cancel_trip",
            'notify_id'     => $this->trip->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }
}
