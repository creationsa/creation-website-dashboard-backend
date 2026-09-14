<?php

namespace App\Models;

use App\Observers\PageObserver;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;

class Page extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded           = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['title', 'desc'];

    protected static function boot()
    {
        parent::boot();
        Page::observe(PageObserver::class);
    }

    public function getImageAttribute($key)
    {
        $media = $this->media()->where('option', 'image')->first();
        $image = $media ? asset('storage/images/pages/' . $media->media) : null;
        return $media ? ['id' => (int) $media->id, 'media' => $image, 'alt' => $media->alt] : null;
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }
}
