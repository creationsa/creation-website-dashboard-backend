<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Static;

use Illuminate\Http\Resources\Json\JsonResource;

class FaqResource extends JsonResource
{
    public function toArray($request)
    {
        $locales = [];

        foreach (config('translatable.locales') as $locale) {
            $translation = $this->translate($locale, false);

            $locales[$locale]['title'] = $translation?->title !== null ? (string) $translation->title : null;
            $locales[$locale]['desc']  = $translation?->desc !== null ? (string) $translation->desc : null;
        }

        return [
            'id'    => $this->id,
            'title' => $this->title,
            'desc'  => $this->desc,
            // 'type'                    => $this->type,
        ] + $locales;
    }
}
