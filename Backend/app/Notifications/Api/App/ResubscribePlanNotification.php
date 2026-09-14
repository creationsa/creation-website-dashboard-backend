<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ResubscribePlanNotification extends Notification implements ShouldBroadcast
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
            'ar' => trans('Do you want to resubscribe', [], 'ar'),
            'en' => trans('Do you want to resubscribe', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('Do you want to resubscribe with :name', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('Do you want to resubscribe with :name', ['name' => $this->user->full_name], 'en'),
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
            'notify_type'   => 'resubscribe_plan',
            'notify_id'     => $this->plan->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
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
            'notify_type'   => "resubscribe_plan",
            'notify_id'     => $this->plan->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }
}
