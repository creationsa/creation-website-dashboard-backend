<?php

namespace App\Http\Resources\Api\Website\Notification;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // $data = $this->data;

        // if (isset($data['title']) && is_array($data['title']) && isset($data['body']) && is_array($data['body'])) {
        //     $data['title']     = $data['title'][app()->getLocale()];
        //     $data['body']      = $data['body'][app()->getLocale()];
        //     $data['notify_id'] = isset($data['notify_id']) && $data['notify_id'] ? $data['notify_id'] : null;
        // }

        // $image = 'https://innova.phpv8.aait-d.com/dashboardAssets/images/backgrounds/avatar.jpg';

        // $return_data =  [
        //     'id'           => $this->id,
        //     'image'        => $image != null ? $image : null,
        //     'is_readed'    => $this->read_at ? true : false,
        //     'read_at'      => $this->read_at,
        //     'created_time' => $this->created_at->diffforHumans(),
        //     'created_at'   => date('d/m/Y', strtotime($this->created_at)),
        // ] + $data;

        // return $return_data;

        $data = $this->data;

        if (isset($data['sender_data']) && $data['sender_data']) {
            $sender_data = $data['sender_data'] ? json_encode($data['sender_data'], true) : null;
            if ($sender_data && isset($sender_data['id']))
            {
                $user                = User::find($sender_data['id']);
                $sender['id']        = $sender_data['id'];
                $sender['full_name'] = isset($sender_data['full_name']) ? $sender_data['full_name'] : null;
                $sender['avatar']    = $user ? $user->avatar : (isset($sender_data['avatar']) ? $sender_data['avatar'] : null);
            }
        }

        if (isset($data['title']) && is_array($data['title']) && isset($data['body']) && is_array($data['body'])) {
            $data['title']      = $data['title'][app()->getLocale()];
            $data['body']       = $data['body'][app()->getLocale()];
            $data['order_id']   = isset($data['order_id']) && $data['order_id'] ? $data['order_id'] : null;
            $data['order_type'] = isset($data['order_type']) && $data['order_type'] ? $data['order_type'] : null;
        }

        $return_data =  [
            'id'           => $this->id,
            'is_readed'    => $this->read_at ? true : false,
            'read_at'      => $this->read_at,
            'created_time' => $this->created_at?->diffforHumans(),
            'created_at'   => $this->created_at?->format('D, M d, Y g:i A'),
        ] + $data;

        return $return_data;
    }
}
