<?php

namespace App\Models;

use App\Observers\BlogObserver;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    public $translatedAttributes = [
        'title',
        'slug',
        'seo_desc',
        'first_sub_title',
        'first_desc',
        'second_desc',
        'second_sub_title',
    ];
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected static function boot()
    {
        parent::boot();
        Blog::observe(BlogObserver::class);
    }

    public function getBaseImageAttribute()
    {
        return $this->getImagePath('base_image');
    }

    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }

    public function getBaseImageObjectAttribute($key)
    {
        return $this->getImageObject('base_image');
    }

    public function getCoverImageAttribute()
    {
        return $this->getImagePath('cover_image');
    }

    public function getCoverImageObjectAttribute()
    {
        return $this->getImageObject('cover_image');
    }


    private function getImagePath(string $option): ?string
    {
        $media = $this->media()->where('option', $option)->first();

        return $media ? asset('storage/images/blogs/' . $media->media) : null;
    }

    private function getImageObject(string $option): ?array
    {
        $media = $this->media()->where('option', $option)->first();

        if (!$media) {
            return null;
        }

        $locales = [];
        foreach (config('translatable.locales') as $locale) {
            $locales[$locale]['alt']        = $media->translate($locale)?->alt;
        }

        return [
            'id'    => (int) $media->id,
            'media' => asset('storage/images/blogs/' . $media->media),
            'alt'   => $media->alt,
        ] + $locales;
    }

    public function metadata()
    {
        return $this->morphOne(Metadata::class, 'metadataable');
    }

    public function items()
    {
        return $this->hasMany(BlogItem::class);
    }
}
