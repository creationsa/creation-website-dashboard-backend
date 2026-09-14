<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\Blog;

class BlogObserver
{
    public function saved(Blog $blog)
    {
        $this->saveImage($blog, 'base_image');
        $this->saveImage($blog, 'cover_image');

        if (isset(request()->other_images)) {
            foreach(request()->other_images as $image){
                AppMedia::withoutEvents(function () use ($blog , $image) {
                    AppMedia::where(['app_mediaable_type' => Blog::class, 'app_mediaable_id' => $blog->id, 'media' => $image ,'option' => 'other_images'])->delete();
                });
                $blog->media()->create(['app_mediaable_type' => Blog::class, 'app_mediaable_id' => $blog->id , 'media_type' => 'image', 'option' => 'other_images' , 'media' => $image]);
            }
        }
    }

    public function deleted(Blog $blog)
    {
        if ($blog->media()->exists()) {
            $images = AppMedia::where(['app_mediaable_type' => Blog::class, 'app_mediaable_id' => $blog->id, 'media_type' => 'image'])->get();
            foreach ($images as $image) {
                $image->delete();
            }
        }
    }

    private function saveImage(Blog $blog, string $option): void
    {
        if (!request()->has($option)) {
            return;
        }

        $image = request($option);
        $media = is_array($image) ? ($image['media'] ?? null) : $image;
        $currentMedia = AppMedia::where([
            'app_mediaable_type' => Blog::class,
            'app_mediaable_id'   => $blog->id,
            'option'             => $option,
        ])->first();

        if (!$media) {
            if ($currentMedia && is_array($image)) {
                $currentMedia->update($this->translatedAltData($image, $option));
            }

            return;
        }

        AppMedia::withoutEvents(function () use ($blog, $option) {
            AppMedia::where([
                'app_mediaable_type' => Blog::class,
                'app_mediaable_id'   => $blog->id,
                'option'             => $option,
            ])->delete();
        });

        $data = [
            'app_mediaable_type' => Blog::class,
            'app_mediaable_id'   => $blog->id,
            'media_type'         => 'image',
            'option'             => $option,
            'media'              => $media,
        ];

        $data += $this->translatedAltData($image, $option);

        $blog->media()->create($data);
    }

    private function translatedAltData($image, string $option): array
    {
        $data = [];

        foreach (config('translatable.locales') as $locale) {
            $alt = is_array($image)
                ? ($image[$locale]['alt'] ?? null)
                : request()->input($option . '_alt.' . $locale);

            if ($alt !== null) {
                $data[$locale]['alt'] = $alt;
            }
        }

        return $data;
    }
}
