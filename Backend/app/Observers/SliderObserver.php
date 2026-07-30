<?php

namespace App\Observers;

use App\Models\Slider;
use App\Models\AppMedia;

class SliderObserver
{
    public function created(Slider $slider)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($slider->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Slider','app_mediaable_id' => $slider->id ,'media_type' => 'image', 'option' => 'slider'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/sliders/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/sliders/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $slider->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'slider']);
        }
    }

    public function deleted(Slider $slider)
    {
        if ($slider->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\Slider', 'app_mediaable_id' => $slider->id ,'media_type' => 'image'])->get();
            foreach ($images as $image)
            {
                $image->delete();
            }
        }
    }
}
