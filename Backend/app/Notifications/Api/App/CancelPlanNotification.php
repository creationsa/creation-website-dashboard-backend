<?php

namespace App\Notifications\Api\App;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

class CancelPlanNotification extends Notification implements ShouldBroadcast
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
    public function __construct($plan, $user = null)
    {
        $this->plan = $plan;
        $this->user = $user;
        $this->title = [
            'ar' => trans('Your Plan has been cancelled', [], 'ar'),
            'en' => trans('Your Plan has been cancelled', [], 'en'),
        ];
        $this->body = [
            'ar' => trans('Your Plan has been cancelled from :name', ['name' => $this->user->full_name], 'ar'),
            'en' => trans('Your Plan has been cancelled from :name', ['name' => $this->user->full_name], 'en'),
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
            'notify_type'   => 'cancel_plan',
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
            'notify_type'   => "cancel_plan",
            'notify_id'     => $this->plan->id,
            //'notify_status' => "client_cancel",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => $this->user->only(['id', 'full_name', 'avatar']),
        ];
    }
}
