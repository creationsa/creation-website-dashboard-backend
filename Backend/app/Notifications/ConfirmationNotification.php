<?php

namespace App\Notifications;

use App\Mail\ConfirmationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConfirmationNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    private $_data, $confirmation_mail, $_via_data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, $confirmation_mail, $via_data = ['mail'])
    {
        $this->_data              = $data;
        $this->_via_data          = $via_data;
        $this->confirmation_mail = $confirmation_mail;
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
        return (new ConfirmationMail($this->_data))->to($this->confirmation_mail);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    
}
