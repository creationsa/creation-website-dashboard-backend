<?php

namespace App\Observers;

use App\Models\About;
use App\Models\AppMedia;

class AboutObserver
{
    public function created(About $about)
    {
        if (request()->has('images')) {
            foreach (request()->images as $image)
            {
                if (isset($image['media']) && $image['media'] != null)
                {
                    if ($about->media()->exists()) {
                        $media = AppMedia::where(['app_mediaable_type' => 'App\Models\About','app_mediaable_id' => $about->id , 'media_type' => 'image'])->find($image['id']);
                        if ($media)  $media->delete();
                    }
                    $about->media()->create($image + ['media_type' => 'image']);
                }
            }
        }

        if (request()->has('main_image') && isset(request()->main_image['media']) && request()->main_image['media'] != null) {
            if ($about->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\About','app_mediaable_id' => $about->id ,'media_type' => 'image', 'option' => 'main_image'])->first();
                if($image) $image->delete();
            }
            $about->media()->create(request('main_image') + ['media_type' => 'image', 'option' => 'main_image']);
        }
    }

    public function deleted(About $about)
    {
        if ($about->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\About', 'app_mediaable_id' => $about->id ,'media_type' => 'image'])->get();
            foreach ($images as $image)
            {
                $image->delete();
            }
        }
    }
}
