<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class DriverCancelTripNotification extends Notification implements ShouldBroadcast
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
            'ar' => trans('The driver :name has cancelled the trip', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('The driver :name has cancelled the trip', ['name' => $this->user->full_name], 'en'),
        ];
        $this->body = [
            'ar' => trans('The driver :name has cancelled the trip, the admin will assign new driver to you', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('The driver :name has cancelled the trip, the admin will assign new driver to you', ['name' => $this->user->full_name], 'en'),
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
                'title'         => $this->title,
                'body'          => $this->body,
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
