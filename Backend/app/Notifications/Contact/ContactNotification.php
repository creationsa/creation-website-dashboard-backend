<?php

namespace App\Notifications\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Support\Str;

class ContactNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data)
    {
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
        return ['database', 'broadcast', 'redis'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'notify_type' => 'contact',
            'contact_id' => $this->data->id,
            'user_id'    => $this->data->user_id,
            'full_name'  => $this->data->full_name,
            'title'      => trans('You have a new message'),
            'body'       => Str::limit($this->data->content, 100),
            'created_at' => date("Y-m-d h:i A"),
        ]);
    }

    public function toRedis($notifiable)
    {
        return [
            "event" => "notification:" . $notifiable->id,
            'data'  => [
                'notify_type' => 'contact',
                'contact_id'  => $this->data->id,
                'user_id'     => $this->data->user_id,
                'full_name'   => $this->data->full_name,
                'title'       => trans('You have a new message'),
                'body'        => Str::limit($this->data->content, 100),
                'created_at'  => date("Y-m-d h:i A"),
            ]
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
            'notify_type' => 'contact',
            'contact_id'  => $this->data->id,
            'user_id'     => $this->data->user_id,
            'full_name'   => $this->data->full_name,
            'title'       => trans('You have a new message'),
            'body'        => Str::limit($this->data->content, 100),
            'created_at'  => date("Y-m-d h:i A"),
        ];
    }
}
