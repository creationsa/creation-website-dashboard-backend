<?php

namespace App\Observers;

use App\Models\ChooseUs;
use App\Models\AppMedia;

class ChooseUsObserver
{
    public function saved(ChooseUs $choose_us)
    {
        if (request()->has('media') && isset(request()->media) && request()->media != null) {
            if ($choose_us->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\ChooseUs','app_mediaable_id' => $choose_us->id ,'media_type' => 'image', 'option' => 'choose_us'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/choose_us/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/choose_us/' . $image->media));
                    }
                    if (file_exists(storage_path('app/public/files/choose_us/' . $image->media))) {
                        \File::delete(storage_path('app/public/files/choose_us/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $choose_us->media()->create(['media' => request()->media, 'media_type' => 'image', 'option' => 'choose_us']);
        }

        if (request()->has('icon') && isset(request()->icon) && request()->icon != null) {
            if ($choose_us->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\ChooseUs', 'app_mediaable_id' => $choose_us->id, 'media_type' => 'image', 'option' => 'icon'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/choose_us/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/choose_us/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $choose_us->media()->create(['media' => request()->icon, 'media_type' => 'image', 'option' => 'icon']);
        }
    }

    public function deleted(ChooseUs $choose_us)
    {
        if ($choose_us->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\ChooseUs', 'app_mediaable_id' => $choose_us->id ,'media_type' => 'image'])->get();
            foreach ($images as $image)
            {
                $image->delete();
            }
        }
    }
}
