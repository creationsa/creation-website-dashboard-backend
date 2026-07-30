<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CohostDatabseNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    private $_data, $_via_data, $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, $via_data = ['database'])
    {
        $this->_data              = $data;
        $this->_via_data          = $via_data;

        $this->title = [
            'ar' => 'لقد تمت دعوتك لتكون مساعد في '.$data['event_name'],
            'en' => 'You have been invited as a co-host to this invitation '.$data['event_name'],
        ];
        $this->body = [
            'ar' => 'لقد تمت دعوتك لتكون مساعد في ' . $data['event_name'],
            'en' => 'You have been invited as a co-host to this invitation ' . $data['event_name'],
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
            'notify_type'   => 'cohost',
            'notify_id'     =>  null,
            'notify_status' => "send_invitation",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => auth('api')->user()->only(['id', 'full_name', 'image']),
        ];
    }
    
}
