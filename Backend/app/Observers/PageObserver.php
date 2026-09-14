<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Page;

class PageObserver
{
    public function saved(Page $page)
    {
        if (request()->has('image') && isset(request()->image['media']) && request()->image['media'] != null) {
            if ($page->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Page', 'app_mediaable_id' => $page->id, 'media_type' => 'image', 'option' => 'image'])->first();
                if ($image) $image->delete();
            }
            $page->media()->create(request('image') + ['media_type' => 'image', 'option' => 'image']);
        }
    }

    public function deleted(Page $page)
    {
        if ($page->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => 'App\Models\Page', 'app_mediaable_id' => $page->id, 'media_type' => 'image'])->get();
            foreach ($images as $image) {
                $image->delete();
            }
        }
    }
}
