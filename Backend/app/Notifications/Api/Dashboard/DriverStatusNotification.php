<?php

namespace App\Notifications\Api\Dashboard;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DriverStatusNotification extends Notification // implements ShouldBroadcast
{
    use Queueable;

    public $user, $status, $via , $title, $body;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($user, $status, array $via)
    {
        $this->via  = $via;
        $this->user = $user;
        $this->status = $status;
        if ($this->status == 'accepted') {
            $this->title = [
                'en' => 'Congratulations! Your data has been accepted',
                'ar' => 'تهانينا! لقد تم قبول بياناتك',
            ];
            $this->body = [
                'en' => 'Your data has been accepted and you can now start working as a driver.',
                'ar' => 'لقد تم قبول بياناتك ويمكنك الآن البدء في العمل كسائق.',
            ];
        }

        if ($this->status == 'rejected') {
            $this->title = [
                'en' => 'Sorry! Your data has been rejected',
                'ar' => 'عذرًا! لقد تم رفض بياناتك',
            ];
            $this->body = [
                'en' => 'Your data has been rejected, please contact the administration to resolve the issue.',
                'ar' => 'لقد تم رفض بياناتك يرجى التواصل مع الادارة لحل المشكلة.',
            ];
        }
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
            'notify_type'   => 'driver_status',
            'notify_id'     => $this->user['id'] ?? null,
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
            'notify_type'   => 'driver_status',
            'notify_id'     => $this->user['id'] ?? null,
            'notify_status' => null,
            'title'         => isset($this->title) ? $this->title[$notifiable->locale ?? 'en'] : null,
            'body'          => isset($this->body) ? $this->body[$notifiable->locale ?? 'en'] : null,
            'sender_data'   => null,
        ];
    }
}
