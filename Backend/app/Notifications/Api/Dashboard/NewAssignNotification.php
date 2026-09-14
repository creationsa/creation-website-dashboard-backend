<?php

namespace App\Notifications\Api\Dashboard;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewAssignNotification extends Notification // implements ShouldBroadcast
{
    use Queueable;

    public $trip_id, $via , $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($trip_id, array $via)
    {
        $this->via  = $via;
        $this->trip_id = $trip_id;
        $this->title = [
            'en' => 'we have assigned a new driver',
            'ar' => 'لقد تم تعيين سائق جديد',
        ];
        $this->body = [
            'en' => 'A new driver has been assigned to you.',
            'ar' => 'لقد تم تعيين سائق جديد لك.',
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
        return $this->via;
    }

    public function toFcm($notifiable)
    {
        return [
            'notify_type'   => 'trip',
            'notify_id'     => $this->trip_id ?? null,
            'notify_status' => null,
            'title'         => isset($this->title) ? $this->title[$notifiable->locale ?? 'en'] : null,
            'body'          => isset($this->body) ? $this->body[$notifiable->locale ?? 'en'] : null,
            'sender_data'   => null,
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
            'notify_type'   => 'trip',
            'notify_id'     => $this->trip_id ?? null,
            'notify_status' => null,
            'title'         => isset($this->title) ? $this->title[$notifiable->locale ?? 'en'] : null,
            'body'          => isset($this->body) ? $this->body[$notifiable->locale ?? 'en'] : null,
            'sender_data'   => null,
        ];
    }
}
