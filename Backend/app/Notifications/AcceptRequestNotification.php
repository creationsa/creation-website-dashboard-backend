<?php

namespace App\Notifications;

use App\Mail\AcceptRequestMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AcceptRequestNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    private $_data, $mail, $_via_data, $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, $mail, $via_data = ['database'])
    {
        $this->_data              = $data;
        $this->_via_data          = $via_data;
        $this->mail               = $mail;

        $this->title = [
            'ar' => 'قام '.$data['name']. $data['status'] == 'accepted' ? ' برفض' : ' بقبول'.' طلبك كمساعد في '.$data['event_name'],
            'en' => $data['name'].' has '.$data['status'].' your request to co-host '.$data['event_name'].' with you',
        ];
        $this->body = [
            'ar' => 'قام ' . $this->_data['name'] . $this->_data['status'] == 'accepted' ? ' برفض' : ' بقبول' . ' طلبك كمساعد في ' . $this->_data['event_name'],
            'en' => $data['name'].' has '.$data['status'].' your request to co-host '.$data['event_name'].' with you',
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
        return (new AcceptRequestMail($this->_data))->to($this->mail);
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
            'notify_status' => "change_status",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => auth('api')->user()->only(['id', 'full_name', 'image']),
        ];
    }
    
}
