<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Faq;

use Illuminate\Http\Resources\Json\JsonResource;

class FaqResource extends JsonResource
{
    public function toArray($request)
    {
        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['title']        = $this->translate($locale)->title != null ? (string)$this->translate($locale)->title : null;
            $locales[$locale]['desc']         = $this->translate($locale)->desc != null ? (string)$this->translate($locale)->desc : null;
        }
        return [
            'id'                    => $this->id,
            'title'                    => $this->title,
            'desc'                    => $this->desc,
        ]+ $locales;
    }
}
