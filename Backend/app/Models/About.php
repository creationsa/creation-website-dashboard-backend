<?php

namespace App\Models;

use App\Observers\AboutObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class About extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    protected static function boot()
    {
        parent::boot();
        About::observe(AboutObserver::class);
    }

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['title', 'desc', 'slug'];

    public function getImagesAttribute($key)
    {
        $medias = $this->media()->where('option', null)->get();
        $images = [];

        foreach ($medias as $media)
        {
            $image = $media ? asset('storage/images/abouts/' . $media->media) : null;
            if ($image) array_push($images, ['id' => (int) $media->id, 'media' => $image, 'alt' => $media->alt]);
        }
        return $images;
    }

    public function getMainImageAttribute($key)
    {
        $media = $this->media()->where('option', 'main_image')->first();
        $image = $media ? asset('storage/images/abouts/' . $media->media) : null;
        return $media ? ['id' => (int) $media->id, 'media' => $image, 'alt' => $media->alt] : null;
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }
}
