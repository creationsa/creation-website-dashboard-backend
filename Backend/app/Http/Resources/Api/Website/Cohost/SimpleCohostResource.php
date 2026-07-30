<?php

namespace App\Http\Resources\Api\Website\Cohost;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Website\User\UserIndexResource;
use App\Http\Resources\Api\Website\UserTemplate\UserTemplateResource;
use App\Models\CohostPoint;

class SimpleCohostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $remaining_points = CohostPoint::where(['host_id'=> $this->userTemplate->user_id, 'cohost_id' => auth('api')->id()])->first();
        return [
            'id'                    => (int)$this->id,
            'name'                  => $this->name,
            'number_of_guests'      => (int) $this->number_of_guests,
            'unlimited_guests'      => (bool) $this->unlimited_guests,
            'allow_customize_events'=> (bool) $this->allow_customize_events,
            'allow_track_guests'    => (bool) $this->allow_track_guests,
            'remaining_points'      => $remaining_points ? (int) $remaining_points->points : 0,
            'remaining_guests'      => (int) $this->add_guests,
            'host'                  => UserIndexResource::make($this->userTemplate->user),
            'created_at'            => $this->created_at->toDayDateTimeString()

        ];
    }
}
