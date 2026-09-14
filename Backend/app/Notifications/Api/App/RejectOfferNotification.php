<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class RejectOfferNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $offer;
    public $user;
    private $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($offer)
    {
        $this->offer = $offer;
        $this->user = $offer->plan->user;
        $this->title = [
            'ar' => trans('Your Offer has been rejected', [], 'ar'),
            'en' => trans('Your Offer has been rejected', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('Your Offer has been rejected from :name', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('Your Offer has been rejected from :name', ['name' => $this->user->full_name], 'en'),
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
            'notify_type'   => 'reject_offer',
            'notify_id'     => $this->offer->plan_id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }

    // public function realTime($notifiable)
    // {
    //     $fcm_data = [
    //         "event" => 'DashboardNotification' . ":" . $notifiable->id,
    //         "data"  => [
    //             'notify_type'   => 'new_plan',
    //             'notify_id'     => $this->order->id,
    //             //'notify_status' => $this->notify_status,
    //             'title'         => $this->title,
    //             'body'          => $this->body,
    //             'sender_data'   => auth('api')->check() ? ['id' => auth('api')->user()->id,'full_name' => auth('api')->user()->full_name] : null,
    //         ]
    //     ];

    //     Redis::publish("private-notification", json_encode($fcm_data));
    // }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'notify_type'   => "reject_offer",
            'notify_id'     => $this->offer->plan_id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }
}
