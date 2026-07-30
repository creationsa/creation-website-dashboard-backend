<?php

namespace App\Notifications;

use App\Mail\SubscriptionMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    private $_data, $_subscription_mail, $_via_data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, $subscription_mail, $via_data = ['database', 'broadcast'])
    {
        $this->_data              = $data;
        $this->_via_data          = $via_data;
        $this->_subscription_mail = $subscription_mail;
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
        return (new SubscriptionMail($this->_data))->to($this->_subscription_mail);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $data =  [
            'title'        => $this->_data['title'],
            'notify_type'  => isset($this->_data['notify_type']) ? $this->_data['notify_type'] : 'management',
            'body'         => $this->_data['body'],
            'route'        => isset($this->_data['route']) ? $this->_data['route'] : '',
            'link_text'    => isset($this->_data['link_text']) ? $this->_data['link_text'] : '',
            'message_type' => isset($this->_data['message_type']) ? $this->_data['message_type'] : '',
        ];

        $data['image']        = isset($this->_data['image']) ? $this->_data['image'] : '';
        $data['published_at'] = isset($this->_data['published_at']) ? $this->_data['published_at'] : '';
        return $data;
    }
}
