<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MinPointNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    private $_via_data, $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($via_data = ['database'])
    {
        $this->_via_data          = $via_data;

        $this->title = [
            'ar' => 'نقاطت اصبحت اقل من 5, يمكنك شحن نقاطك من هنا',
            'en' => 'Your points are less than 5 points, you can charge points from here',
        ];
        $this->body = [
            'ar' => 'نقاطت اصبحت اقل من 5, يمكنك شحن نقاطك من هنا',
            'en' => 'Your points are less than 5 points, you can charge points from here',
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
        return $this->_via_data;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
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
            'notify_type'   => 'points',
            'notify_id'     =>  null,
            'notify_status' => "points",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => auth('api')->user()->only(['id', 'full_name', 'image']),
        ];
    }
    
}
