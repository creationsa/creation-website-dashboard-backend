<?php

namespace App\Observers;

use App\Models\ThirdSection;
use App\Models\AppMedia;

class ThirdSectionObserver
{
    public function saved(ThirdSection $third_section)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($third_section->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\ThirdSection','app_mediaable_id' => $third_section->id ,'media_type' => 'image', 'option' => 'thirdsection'])->first();
                if ($image) {
                    if (file_exists(storage_path('app/public/images/third_sections/' . $image->media))) {
                        \File::delete(storage_path('app/public/images/third_sections/' . $image->media));
                    }
                    $image->delete();
                }
            }
            $third_section->media()->create(request('third_section') + ['media_type' => 'image', 'option' => 'thirdsection']);
        }
    }

    public function deleted(Thirdsection $third_section)
    {
        if ($third_section->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\Thirdsection', 'app_mediaable_id' => $third_section->id ,'media_type' => 'image'])->get();
            foreach ($images as $image)
            {
                $image->delete();
            }
        }
    }
}
