<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\EnvelopeLiner;

use Illuminate\Support\Facades\Log;

class EnvelopeLinerObserver
{

    public function created(EnvelopeLiner $envelope_liner)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($envelope_liner->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeLiner', 'app_mediaable_id' => $envelope_liner->id, 'media_type' => 'image'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/envelope_liners/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/envelope_liners/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $envelope_liner->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'image']);
        }

        if (request()->has('thumbnail') && isset(request()->thumbnail) && request()->thumbnail != null) {
            if ($envelope_liner->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeLiner', 'app_mediaable_id' => $envelope_liner->id, 'media_type' => 'image', 'option' => 'thumbnail'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/envelope_liners/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/envelope_liners/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $envelope_liner->media()->create(['media' => request()->thumbnail, 'media_type' => 'image', 'option' => 'thumbnail']);
        }
    }

    // public function deleted(EnvelopeLiner $envelope_liner)
    // {
    //     if ($envelope_liner->media()->exists()) {
    //         $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeLiner', 'app_mediaable_id' => $envelope_liner->id ,'media_type' => 'image'])->first();
    //         if (file_exists(storage_path('app/public/images/envelope_liners/' . $image->media))) {
    //             \File::delete(storage_path('app/public/images/envelope_liners/' . $image->media));
    //         }
    //         $image->delete();
    //     }
    // }
}
