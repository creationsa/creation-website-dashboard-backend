<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\PaperBackground;

use Illuminate\Support\Facades\Log;

class PaperBackgroundObserver
{

    public function created(PaperBackground $paper_background)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($paper_background->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\PaperBackground', 'app_mediaable_id' => $paper_background->id, 'media_type' => 'image'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/paper_backgrounds/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/paper_backgrounds/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $paper_background->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'image']);
        }

        if (request()->has('thumbnail') && isset(request()->thumbnail) && request()->thumbnail != null) {
            if ($paper_background->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\PaperBackground', 'app_mediaable_id' => $paper_background->id, 'media_type' => 'image', 'option' => 'thumbnail'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/paper_backgrounds/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/paper_backgrounds/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $paper_background->media()->create(['media' => request()->thumbnail, 'media_type' => 'image', 'option' => 'thumbnail']);
        }
    }

    // public function deleted(PaperBackground $paper_background)
    // {
    //     if ($paper_background->media()->exists()) {
    //         $image = AppMedia::where(['app_mediaable_type' => 'App\Models\PaperBackground', 'app_mediaable_id' => $paper_background->id, 'media_type' => 'image'])->first();
    //         if (file_exists(storage_path('app/public/images/paper_backgrounds/' . $image->media))) {
    //             \File::delete(storage_path('app/public/images/paper_backgrounds/' . $image->media));
    //         }
    //         $image->delete();
    //     }
    // }
}
