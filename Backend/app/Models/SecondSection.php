<?php

namespace App\Models;

use App\Observers\SecondSectionObserver;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;

class SecondSection extends Model implements TranslatableContract
{
    use Translatable;
    protected $guarded = ['id','created_at','updated_at'];
    public $translatedAttributes = ['title'];

    // protected static function boot()
    // {
    //     parent::boot();
    //     SecondSection::observe(SecondSectionObserver::class) ;
    // }

    public function getImageAttribute($key)
    {
        $media = $this->media()->first();
        $image = $media ? asset('storage/images/second_sections/' . $media->media) : null;
        return $image;
    }

    // Relations
    // ========================= Image ===================
    public function media()
    {
    	return $this->morphOne(AppMedia::class,'app_mediaable');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
