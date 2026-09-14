<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Client;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'title_en' => (string) $this->translate('en')?->title,
            'title_ar' => (string) $this->translate('ar')?->title,
            'logos' => $this->logos->map(fn ($logo) => [
                'logo_image' => $logo->path ?? '',
                'alt_en' => (string) $logo->translate('en')?->alt,
                'alt_ar' => (string) $logo->translate('ar')?->alt,
            ])->values(),
        ];
    }
}
