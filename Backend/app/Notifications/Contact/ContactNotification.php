<?php

namespace App\Notifications\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;

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
        return ['database', 'broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'contact_id' => $this->data->id,
            'user_id'    => $this->data->user_id,
            'full_name'  => $this->data->full_name,
            'title'      => trans('dashboard.contact.notification_message', ['name' => $this->data->full_name]),
            'body'       => str_limit($this->data->content, 100),
            'created_at' => date("Y-m-d h:i A"),
        ]);
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
            'contact_id'  => $this->data->id,
            'title'       => trans('dashboard.contact.notification_message', ['name' => $this->data->full_name]),
            'body'        => str_limit($this->data->content,100),
            'notify_type' => 'contact',
        ];
    }
}
