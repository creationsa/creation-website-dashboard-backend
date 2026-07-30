<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\EnvelopeBackground;

use Illuminate\Support\Facades\Log;

class EnvelopeBackgroundObserver
{

    public function created(EnvelopeBackground $envelope_background)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($envelope_background->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeBackground', 'app_mediaable_id' => $envelope_background->id, 'media_type' => 'image'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/envelope_backgrounds/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/envelope_backgrounds/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $envelope_background->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'image']);
        }

        if (request()->has('thumbnail') && isset(request()->thumbnail) && request()->thumbnail != null) {
            if ($envelope_background->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeBackground', 'app_mediaable_id' => $envelope_background->id, 'media_type' => 'image', 'option' => 'thumbnail'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/envelope_backgrounds/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/envelope_backgrounds/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $envelope_background->media()->create(['media' => request()->thumbnail, 'media_type' => 'image', 'option' => 'thumbnail']);
        }
    }

    // public function deleted(EnvelopeBackground $envelope_background)
    // {
    //     if ($envelope_background->media()->exists()) {
    //         $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeBackground', 'app_mediaable_id' => $envelope_background->id ,'media_type' => 'image'])->first();
    //         if (file_exists(storage_path('app/public/images/envelope_backgrounds/' . $image->media))) {
    //             \File::delete(storage_path('app/public/images/envelope_backgrounds/' . $image->media));
    //         }
    //         $image->delete();
    //     }
    // }
}
