<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Subcategory;

class SubcategoryObserver
{

    public function created(Subcategory $subcategory)
    {
        if (request()->has('big_image') && isset(request()->big_image) && request()->big_image != null) {
            if ($subcategory->media()->exists()) {
                $big_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image', 'option' => 'big_image'])->first();
                if ($big_image) {
                    if (file_exists(storage_path('app/public/images/subcategories/' . $big_image->media))) {
                        \File::delete(storage_path('app/public/images/subcategories/' . $big_image->media));
                    }
                    $big_image->delete();
                }
            }
        }
        $subcategory->media()->create(['media' => request()->big_image, 'media_type' => 'image', 'option' => 'big_image']);

        if (request()->has('small_image') && isset(request()->small_image) && request()->small_image != null) {
            if ($subcategory->media()->exists()) {
                $small_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image', "option" => "small_image"])->first();
                if ($small_image) {
                    if (file_exists(storage_path('app/public/images/subcategories/' . $small_image->media))) {
                        \File::delete(storage_path('app/public/images/subcategories/' . $small_image->media));
                    }
                    $small_image->delete();
                }
            }
        }

        $subcategory->media()->create(['media' => request()->small_image, 'media_type' => 'image', 'option' => 'small_image']);
    }

    public function updated(Subcategory $subcategory)
    {
        \Log::info('Update Observer');
        if (request()->has('big_image') && isset(request()->big_image) && request()->big_image != null) {
            if ($subcategory->media()->exists()) {
                $big_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image', 'option' => 'big_image'])->first();
                if ($big_image) {
                    if (file_exists(storage_path('app/public/images/subcategories/' . $big_image->media))) {
                        \File::delete(storage_path('app/public/images/subcategories/' . $big_image->media));
                    }
                    $big_image->delete();
                }
            }
        }

        $subcategory->media()->create(['media' => request()->big_image, 'media_type' => 'image', 'option' => 'big_image']);

        if (request()->has('small_image') && isset(request()->small_image) && request()->small_image != null) {
            if ($subcategory->media()->exists()) {
                $small_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image', "option" => "small_image"])->first();
                if ($small_image) {
                    if (file_exists(storage_path('app/public/images/subcategories/' . $small_image->media))) {
                        \File::delete(storage_path('app/public/images/subcategories/' . $small_image->media));
                    }
                    $small_image->delete();
                }
            }
        }
        $subcategory->media()->create(['media' => request()->small_image, 'media_type' => 'image', 'option' => 'small_image']);
    }

    public function deleted(Subcategory $subcategory)
    {
        if ($subcategory->media()->exists()) {
            $big_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image'])->first();
            if (file_exists(storage_path('app/public/images/subcategories/' . $big_image->media))) {
                \File::delete(storage_path('app/public/images/subcategories/' . $big_image->media));
            }
            $big_image->delete();

            $small_image = AppMedia::where(['app_mediaable_type' => 'App\Models\Subcategory', 'app_mediaable_id' => $subcategory->id, 'media_type' => 'image'])->first();
            if (file_exists(storage_path('app/public/images/subcategories/' . $small_image->media))) {
                \File::delete(storage_path('app/public/images/subcategories/' . $small_image->media));
            }
            $small_image->delete();
        }
    }
}
