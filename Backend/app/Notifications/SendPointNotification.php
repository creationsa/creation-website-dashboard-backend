<?php

namespace App\Notifications;

use App\Mail\SendPointMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendPointNotification extends Notification implements ShouldBroadcast
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
            'ar' => 'قام ' . $data['host_name'] . ' بارسال ' . $data['points'] .' نقطة لك',
            'en' => $data['host_name'] . ' sent you ' . $data['points'].' points',
        ];
        $this->body = [
            'ar' => 'قام ' . $data['host_name'] . ' بارسال ' . $data['points'] . ' نقطة لك',
            'en' => $data['host_name'] . ' sent you ' . $data['points'] . ' points',
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
    // public function toMail($notifiable)
    // {
    //     return (new SendPointMail($this->_data))->to($this->mail);
    // }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */

    public function toArray($notifiable)
    {
        return [
            'notify_type'   => 'send_points',
            'notify_id'     =>  null,
            'notify_status' => "send_points",
            'title'         => $this->title,
            'body'          => $this->body,
            'sender_data'   => auth('api')->user()->only(['id', 'full_name', 'image']),
        ];
    }
    
}
