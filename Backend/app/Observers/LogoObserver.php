<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Logo;

use Illuminate\Support\Facades\Log;

class LogoObserver
{

    public function created(Logo $logo)
    {
        if (request()->has('logos')) {
            foreach (request()->logos as $media) {
                $logo->media()->create(['media' => $media, 'media_type' => 'image', 'option' => 'logo']);
            }
        }

    }

    public function deleted(Logo $logo)
    {
        if ($logo->media()->exists()) {
            $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Logo', 'app_mediaable_id' => $logo->id, 'media_type' => 'image'])->first();
            if (file_exists(storage_path('app/public/images/logos/' . $image->media))) {
                \File::delete(storage_path('app/public/images/logos/' . $image->media));
            }
            $image->delete();
        }
    }
}
