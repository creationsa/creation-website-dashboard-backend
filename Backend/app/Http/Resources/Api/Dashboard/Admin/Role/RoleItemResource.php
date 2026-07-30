<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Role;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Permission\PermissionResource;

class RoleItemResource extends JsonResource
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
            "id"            =>  $this->id,
            "name"           =>  $this->name,
        ];
    }
}
