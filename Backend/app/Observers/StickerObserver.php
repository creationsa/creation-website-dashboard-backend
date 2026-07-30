<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Sticker;

use Illuminate\Support\Facades\Log;

class StickerObserver
{

    public function created(Sticker $sticker)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($sticker->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Sticker', 'app_mediaable_id' => $sticker->id, 'media_type' => 'image'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/stickers/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/stickers/' . $image->media));
                    }
                    $image->delete();
                }
            }       
            $sticker->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'image']);
        }

    }

    // public function deleted(Sticker $sticker)
    // {
    //     if ($sticker->media()->exists()) {
    //         $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Sticker', 'app_mediaable_id' => $sticker->id ,'media_type' => 'image'])->first();
    //         if (file_exists(storage_path('app/public/images/stickers/' . $image->media))) {
    //             \File::delete(storage_path('app/public/images/stickers/' . $image->media));
    //         }
    //         $image->delete();
    //     }
    // }
}
