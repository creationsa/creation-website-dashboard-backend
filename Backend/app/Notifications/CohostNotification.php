<?php

namespace App\Notifications;

use App\Mail\CohostMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CohostNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    private $_data, $mail, $_via_data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, $mail, $via_data = ['mail'])
    {
        $this->_data              = $data;
        $this->_via_data          = $via_data;
        $this->mail               = $mail;
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
        return (new CohostMail($this->_data))->to($this->mail);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    
}
