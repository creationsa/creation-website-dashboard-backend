<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Permission;

use App\Models\Permission;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomPermissionSideBarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $user = auth()->guard('api')->user();

        if ($user->user_type == 'super_admin') {
            $permissionsArr  =  Permission::pluck('id')->toArray();
        } else {
            $permissionsArr  =  $user->role ? @$user->role->permissions->pluck('id')->toArray() : [];
        }

        $permissions = Permission::whereIn('id', $permissionsArr)->where(function ($q) {
            $q->where('back_route_name', 'like', $this->resource . '.index' . '%')->orWhere('back_route_name', 'like', $this->resource . '.store' . '%');
        })->get();

        return [
            "icon"        => "fa-solid fa-image",
            "title"       => trans('permissions.' . $this->resource),
            "permissions" => PermissionSideBarResource::collection($permissions)
        ];
    }
}
