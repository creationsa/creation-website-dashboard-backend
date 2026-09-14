<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Setting;

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
            'logo_en' => $this->logo_en ? asset('storage/images/settings/' . $this->logo_en) : '',
            'logo_en_alt_en' => (string) $this->logo_en_alt_en,
            'logo_en_alt_ar' => (string) $this->logo_en_alt_ar,

            'logo_ar' => $this->logo_ar ? asset('storage/images/settings/' . $this->logo_ar) : '',
            'logo_ar_alt_en' => (string) $this->logo_ar_alt_en,
            'logo_ar_alt_ar' => (string) $this->logo_ar_alt_ar,

            'socials' => collect($this->socials)->map(fn ($social) => [
                'id' => $social->id,
                'title_en' => (string) $social->title_en,
                'title_ar' => (string) $social->title_ar,
                'link' => (string) $social->link,
            ])->values(),
        ];
    }
}
