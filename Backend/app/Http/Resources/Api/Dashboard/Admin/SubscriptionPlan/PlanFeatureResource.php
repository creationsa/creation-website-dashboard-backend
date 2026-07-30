<?php

namespace App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan;

use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanFeatureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['title'] = $this->translate($locale)?->title;
        }

        return [
            'id'                => (int) $this->id,
            'title'             => (string) $this->title,
        ] + $locales;
    }
}
