<?php

namespace App\Observers;

use App\Models\Cohost;
use App\Models\AppMedia;

class CohostObserver
{
    public function saved(Cohost $cohost)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($cohost->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Cohost','app_mediaable_id' => $cohost->id ,'media_type' => 'image', 'option' => 'cohost'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/cohosts/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/cohosts/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $cohost->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'cohost']);
        }
    }

    public function deleted(Cohost $cohost)
    {
        if ($cohost->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\Cohost', 'app_mediaable_id' => $cohost->id ,'media_type' => 'image'])->get();
            foreach ($images as $image)
            {
                $image->delete();
            }
        }
    }
}
