<?php

namespace App\Http\Resources\Api\Website\Cohost;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Website\User\UserIndexResource;
use App\Http\Resources\Api\Website\UserTemplate\UserTemplateResource;
use App\Models\CohostPoint;

class CohostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $remaining_points = CohostPoint::where(['host_id'=> $this->userTemplate->user_id, 'cohost_id' => auth()->id()])->first();
        return [
            'id'                    => (int)$this->id,
            'name'                  => $this->name,
            'email'                 => $this->email,
            'image'                 => $this->image,
            'status'                => $this->status,
            'is_active'             => (bool) $this->is_active,
            'number_of_guests'      => (int) $this->number_of_guests,
            'unlimited_guests'      => (bool) $this->unlimited_guests,
            'allow_customize_events'=> (bool) $this->allow_customize_events,
            'allow_track_guests'    => (bool) $this->allow_track_guests,
            'remaining_points'      => $remaining_points ? (int) $remaining_points->points : 0,
            'templates'             => UserTemplateResource::make($this->userTemplate),
            'host'                  => UserIndexResource::make($this->userTemplate->user),
            'created_at'            => $this->created_at->toDayDateTimeString()

        ];
    }
}
