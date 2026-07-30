<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Notification;

use Carbon\Carbon;
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
        $data = $this->data;

        if (isset($data['title']) && is_array($data['title']) && isset($data['body']) && is_array($data['body'])) {
            $data['title']       = $data['title'][app()->getLocale()];
            $data['body']        = $data['body'][app()->getLocale()];
            $data['sender_data'] = isset($this->data['sender_data']) ? $this->data['sender_data'] : null;
        }

        $return_data =  [
            'id'           => (string) $this->id,
            'created_time' => $this->created_at->diffforHumans(),
            'created_at'   => date('d/m/Y', strtotime($this->created_at)),
            'read_at'      => Carbon::parse($this->read_at)->format('Y-m-d H:i:s'),
            'is_readed'    => $this->read_at ? true : false,
        ] + $data;

        return $return_data;
    }
}
