<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Backdrop;

use Illuminate\Support\Facades\Log;

class BackdropObserver
{

    public function created(Backdrop $backdrop)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($backdrop->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Backdrop', 'app_mediaable_id' => $backdrop->id, 'media_type' => 'image'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/backdrops/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/backdrops/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $backdrop->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'image']);
        }

        if (request()->has('thumbnail') && isset(request()->thumbnail) && request()->thumbnail != null) {
            if ($backdrop->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Backdrop', 'app_mediaable_id' => $backdrop->id, 'media_type' => 'image', 'option' => 'thumbnail'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/backdrops/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/backdrops/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $backdrop->media()->create(['media' => request()->thumbnail, 'media_type' => 'image', 'option' => 'thumbnail']);
        }
    }

    // public function deleted(Backdrop $backdrop)
    // {
    //     if ($backdrop->media()->exists()) {
    //         $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Backdrop', 'app_mediaable_id' => $backdrop->id, 'media_type' => 'image'])->first();
    //         if (file_exists(storage_path('app/public/images/backdrops/' . $image->media))) {
    //             \File::delete(storage_path('app/public/images/backdrops/' . $image->media));
    //         }
    //         $image->delete();
    //     }
    // }
}
