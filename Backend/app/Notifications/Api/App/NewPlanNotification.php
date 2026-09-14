<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewPlanNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $plan;
    public $user;
    private $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($plan)
    {
        $this->plan = $plan;
        $this->user = $plan->user;
        $this->title = [
            'ar' => trans('You have new plan', [], 'ar'),
            'en' => trans('You have new plan', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('You have new plan from :name', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('You have new plan from :name', ['name' => $this->user->full_name], 'en'),
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
            'notify_type'   => 'new_plan',
            'notify_id'     => $this->plan->id,
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
            'notify_type'   => "new_plan",
            'notify_id'     => $this->plan->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }
}
