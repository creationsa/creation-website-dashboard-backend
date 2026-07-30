<?php

namespace App\Http\Resources\Api\Dashboard\Admin\SideBare;

use Illuminate\Http\Resources\Json\JsonResource;

class SideBareResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
