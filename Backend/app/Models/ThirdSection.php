<?php

namespace App\Models;

use App\Observers\ThirdSectionObserver;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;

class ThirdSection extends Model implements TranslatableContract
{
    use Translatable;
    protected $guarded = ['id','created_at','updated_at'];
    public $translatedAttributes = ['title','sub_title', 'desc'];

    // protected static function boot()
    // {
    //     parent::boot();
    //     ThirdSection::observe(ThirdSectionObserver::class) ;
    // }

    public function getImageAttribute($key)
    {
        $media = $this->media()->first();
        $image = $media ? asset('storage/images/third_sections/' . $media->media) : null;
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
