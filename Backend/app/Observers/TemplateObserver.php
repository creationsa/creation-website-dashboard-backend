<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Template;

class TemplateObserver
{

    public function created(Template $template)
    {
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($template->media()->exists()) {
                $template_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Template', 'app_mediaable_id' => $template->id, 'media_type' => 'image', 'option' => 'template_thumbnail'])->first();
                if ($template_image) {
                    if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                        \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                    }
                    $template_image->delete();
                }
            }
            $template->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'template_thumbnail']);
        }

        if (request()->has('color_image') && isset(request()->color_image) && request()->color_image != null) {
            if ($template->media()->exists()) {
                $template_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Template', 'app_mediaable_id' => $template->id, 'media_type' => 'image', 'option' => 'color_image'])->first();
                if ($template_image) {
                    if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                        \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                    }
                    $template_image->delete();
                }
            }
            $template->media()->create(['media' => request()->color_image, 'media_type' => 'image', 'option' => 'color_image']);
        }

        if (request()->has('template_preview') && isset(request()->template_preview) && request()->template_preview != null) {
            if ($template->media()->exists()) {
                $template_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Template', 'app_mediaable_id' => $template->id, 'media_type' => 'image', 'option' => 'template_preview'])->first();
                if ($template_image) {
                    if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                        \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                    }
                    $template_image->delete();
                }
            }
            $template->media()->create(['media' => request()->template_preview, 'media_type' => 'image', 'option' => 'template_preview']);
        }

        if (request()->has('template_assets') && is_array(request()->template_assets)) {
            foreach (request()->template_assets as $imageObject) {
                if (isset($imageObject['id']) && isset($imageObject['url'])) {
                    $option = 'asset_' . $imageObject['id'];

                    $template_image = AppMedia::where([
                        'app_mediaable_type' => 'App\Models\Template',
                        'app_mediaable_id' => $template->id,
                        'media_type' => 'image',
                        'option' => $option,
                    ])->first();

                    if ($template_image) {
                        if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                            \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                        }
                        $template_image->delete();
                    }

                    $template->media()->create([
                        'media' => $imageObject['url'],
                        'media_type' => 'image',
                        'option' => $option,
                    ]);
                }
            }
        }

    }

    public function updated(Template $template)
    {
        \Log::info('Update Template Observer');
        if (request()->has('image') && isset(request()->image) && request()->image != null) {
            if ($template->media()->exists()) {
                $template_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Template', 'app_mediaable_id' => $template->id, 'media_type' => 'image', 'option' => 'template_thumbnail'])->first();
                if ($template_image) {
                    if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                        \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                    }
                    $template_image->delete();
                }
            }
            $template->media()->create(['media' => request()->image, 'media_type' => 'image', 'option' => 'template_thumbnail']);
        }

        if (request()->has('color_image') && isset(request()->color_image) && request()->color_image != null) {
            if ($template->media()->exists()) {
                $template_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Template', 'app_mediaable_id' => $template->id, 'media_type' => 'image', 'option' => 'color_image'])->first();
                if ($template_image) {
                    if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                        \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                    }
                    $template_image->delete();
                }
            }
            $template->media()->create(['media' => request()->color_image, 'media_type' => 'image', 'option' => 'color_image']);
        }

        if (request()->has('template_preview') && isset(request()->template_preview) && request()->template_preview != null) {
            if ($template->media()->exists()) {
                $template_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Template', 'app_mediaable_id' => $template->id, 'media_type' => 'image', 'option' => 'template_preview'])->first();
                if ($template_image) {
                    if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                        \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                    }
                    $template_image->delete();
                }
            }
            $template->media()->create(['media' => request()->template_preview, 'media_type' => 'image', 'option' => 'template_preview']);
        }

        if (request()->has('template_assets') && is_array(request()->template_assets)) {
            foreach (request()->template_assets as $imageObject) {
                if (isset($imageObject['id']) && isset($imageObject['url'])) {
                    $option = 'asset_' . $imageObject['id'];

                    $template_image = AppMedia::where([
                        'app_mediaable_type' => 'App\Models\Template',
                        'app_mediaable_id' => $template->id,
                        'media_type' => 'image',
                        'option' => $option,
                    ])->first();

                    if ($template_image) {
                        if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                            \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                        }
                        $template_image->delete();
                    }

                    $template->media()->create([
                        'media' => $imageObject['url'],
                        'media_type' => 'image',
                        'option' => $option,
                    ]);
                }
            }
        }
    }

    public function deleted(Template $template)
    {
        if ($template->media()->exists()) {
            $template_images = AppMedia::where([
                'app_mediaable_type' => 'App\Models\Template',
                'app_mediaable_id' => $template->id,
                'media_type' => 'image',
            ])->get();

            foreach ($template_images as $template_image) {
                if (file_exists(storage_path('app/public/images/templates/' . $template_image->media))) {
                    \File::delete(storage_path('app/public/images/templates/' . $template_image->media));
                }
                $template_image->delete();
            }
        }
    }
}
