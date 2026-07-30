<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\EnvelopeStamp;

use Illuminate\Support\Facades\Log;

class EnvelopeStampObserver
{

    public function created(EnvelopeStamp $envelope_stamp)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($envelope_stamp->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeStamp', 'app_mediaable_id' => $envelope_stamp->id, 'media_type' => 'image'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/envelope_stamps/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/envelope_stamps/' . $image->media));
                    }
                    $image->delete();
                }
            }       
            $envelope_stamp->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'image']);
        }

    }

    // public function deleted(EnvelopeStamp $envelope_stamp)
    // {
    //     if ($envelope_stamp->media()->exists()) {
    //         $image = AppMedia::where(['app_mediaable_type' => 'App\Models\EnvelopeStamp', 'app_mediaable_id' => $envelope_stamp->id ,'media_type' => 'image'])->first();
    //         if (file_exists(storage_path('app/public/images/envelope_stamps/' . $image->media))) {
    //             \File::delete(storage_path('app/public/images/envelope_stamps/' . $image->media));
    //         }
    //         $image->delete();
    //     }
    // }
}
