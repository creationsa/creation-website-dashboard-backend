<?php

namespace App\Http\Resources\Api\Dashboard\Admin\SubscriptionPlan;

use App\Http\Resources\Api\Dashboard\Admin\Subcategory\SubcategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionPlanResource extends JsonResource
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
            $locales[$locale]['desc'] = $this->translate($locale)?->desc;
        }

        return [
            'id'                => (int) $this->id,
            'title'             => (string) $this->title,
            'desc'              => (string) $this->desc,
            'price'             => (float) $this->price,
            'invetation_num'    => (int) $this->invetation_num,
            'features'          => PlanFeatureResource::collection($this->planFeatures)
        ] + $locales;
    }
}
