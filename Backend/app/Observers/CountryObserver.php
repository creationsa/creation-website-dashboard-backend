<?php

namespace App\Observers;

use App\Models\Country;
use App\Models\AppMedia;

class CountryObserver
{
    public function saved(Country $country)
    {
        if (request()->has('flag') && isset(request()->flag['media']) && request()->flag['media'] != null) {
            if ($country->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Country','app_mediaable_id' => $country->id ,'media_type' => 'image', 'option' => 'flag'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/countries/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/countries/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $country->media()->create(request('flag') + ['media_type' => 'image', 'option' => 'flag']);
        }
    }

    public function deleted(Country $country)
    {
        if ($country->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\Country', 'app_mediaable_id' => $country->id ,'media_type' => 'image'])->get();
            foreach ($images as $image)
            {
                $image->delete();
            }
        }
    }
}
