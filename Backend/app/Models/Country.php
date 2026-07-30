<?php

namespace App\Models;

use App\Observers\CountryObserver;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model implements TranslatableContract
{
    use Translatable, SoftDeletes;
    protected $guarded = ['id','created_at','updated_at','deleted_at'];
    public $translatedAttributes = ['name','nationality'];

    protected static function boot()
    {
        parent::boot();
        Country::observe(CountryObserver::class) ;
    }

    public function getFlagAttribute($key)
    {
        $media = $this->media()->where('option', 'flag')->first();
        $image = $media ? asset('storage/images/countries/' . $media->media) : null;
        return $media ? ['id' => (int) $media->id, 'media' => $image, 'alt' => $media->alt] : null;
    }

    // Relations
    // ========================= Image ===================
    public function media()
    {
    	return $this->morphOne(AppMedia::class,'app_mediaable');
    }

    public function cities()
    {
    	return $this->hasMany(City::class);
    }

}
