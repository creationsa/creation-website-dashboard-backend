<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\PageStyle;

use Illuminate\Support\Facades\Log;

class PageStyleObserver
{

    public function created(PageStyle $pagestyle)
    {
        if (request()->has('file') && isset(request()->file) && request()->file != null) {
            if ($pagestyle->media()->exists()) {
                $pagestyle = AppMedia::where(['app_mediaable_type' => 'App\Models\PageStyle', 'app_mediaable_id' => $pagestyle->id, 'media_type' => 'file'])->first();
                if ($pagestyle) {
                    if (file_exists(storage_path('app/public/files/page_styles/' . $pagestyle->media))) {
                        \File::delete(storage_path('app/public/files/page_styles/' . $pagestyle->media));
                    }
                    $pagestyle->delete();
                }
            }       
            $pagestyle->media()->create(['media' => request()->file, 'media_type' => 'file', 'option' => 'file']);
        }

    }

    // public function deleted(PageStyle $pagestyle)
    // {
    //     if ($pagestyle->media()->exists()) {
    //         $file = AppMedia::where(['app_mediaable_type' => 'App\Models\PageStyle', 'app_mediaable_id' => $pagestyle->id ,'media_type' => 'file'])->first();
    //         if (file_exists(storage_path('app/public/files/page_styles/' . $file->media))) {
    //             \File::delete(storage_path('app/public/files/page_styles/' . $file->media));
    //         }
    //         $file->delete();
    //     }
    // }
}
