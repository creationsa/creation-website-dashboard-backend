<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Font;

use Illuminate\Support\Facades\Log;

class FontObserver
{

    public function created(Font $font)
    {
        if (request()->has('file') && isset(request()->file) && request()->file != null) {
            if ($font->media()->exists()) {
                $font = AppMedia::where(['app_mediaable_type' => 'App\Models\Font', 'app_mediaable_id' => $font->id, 'media_type' => 'file'])->first();
                if ($font) {
                    if (file_exists(storage_path('app/public/files/fonts/' . $font->media))) {
                        \File::delete(storage_path('app/public/files/fonts/' . $font->media));
                    }
                    $font->delete();
                }
            }       
            $font->media()->create(['media' => request()->file, 'media_type' => 'file', 'option' => 'file']);
        }

    }

    // public function deleted(Font $font)
    // {
    //     if ($font->media()->exists()) {
    //         $file = AppMedia::where(['app_mediaable_type' => 'App\Models\Font', 'app_mediaable_id' => $font->id ,'media_type' => 'file'])->first();
    //         if (file_exists(storage_path('app/public/files/fonts/' . $file->media))) {
    //             \File::delete(storage_path('app/public/files/fonts/' . $file->media));
    //         }
    //         $file->delete();
    //     }
    // }
}
