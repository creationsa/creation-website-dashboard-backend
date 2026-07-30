<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Setting;

use App\Http\Resources\Api\App\Client\Order\Restaurant\RestaurantCategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
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
            'id'    => (int) $this->id,
            'key'   => (string) $this->key,
            'value' => (string) $this->value,
        ];
    }
}
