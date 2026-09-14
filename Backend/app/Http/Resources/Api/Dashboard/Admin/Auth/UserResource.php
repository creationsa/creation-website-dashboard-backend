<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Auth;

use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Role\RoleResource;
use App\Models\Permission;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Dashboard\Admin\Admin\{PermissionResource};


class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        if($this->user_type == 'super_admin') {
            $permissions  =  Permission::get();
        } else {
            $permissions  =  $this->role ? $this->role?->permissions()->get() : [];
        }

        return [
            'id'            => (int) $this->id,
            'full_name'     => (string) $this->full_name,
            'image'         => (string) $this->image,
            'phone_code'    => (string) $this->phone_code,
            'phone'         => (string) $this->phone,
            'phone_complete_form' => $this->phone_code . $this->phone,
            'email'         => (string) $this->email,
            'user_type'     => (string) $this->user_type,
            'gender'        => (string) $this->gender,
            'is_ban'        => (bool) $this->is_ban,
            'ban_reason'    => (string) $this->ban_reason,
            'role_id'       => $this->role_id,
            'country'       => new CountryItemResource($this->country),
            'locale'        => (string) $this->locale,
            'token'         => $this->when($this->token, $this->token),
            'role'          => RoleResource::make($this->role),
            'permission'   => PermissionResource::collection($permissions),
            'created_at'    => $this->created_at ? $this->created_at->format('Y-m-d') : null,
        ];
    }
}
