<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Contact;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'full_name'  => $this->full_name,
            'email'      => $this->email,
            // 'phone'      => $this->phone,
            // 'title'      => $this->title,
            'content'    => $this->content,
            'read_at'    => $this->read_at?->format('Y-m-d H:i:s'),
            'image'      => $this->user ? $this->user->image : null,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d') : null,
            'replies'    => ContactRepliesResource::collection($this->replies)

            // 'user'       => SimpleUserResource::make($this->user),
        ];
    }
}
