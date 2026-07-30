<?php

namespace App\Models;

use App\Observers\SliderObserver;
use Illuminate\Support\Facades\File;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Translatable;

class Slider extends Model implements TranslatableContract
{
    use Translatable;
    
    protected $guarded = ['id','created_at','updated_at'];
    public $translatedAttributes = ['title', 'desc'];
    // protected static function boot()
    // {
    //     parent::boot();
    //     Slider::observe(SliderObserver::class) ;
    // }

    public function getImageAttribute($key)
    {
        $lang = app()->getLocale();
        $media = $this->media()->whereIn('option', ['slider_'.$lang, 'slider'])->first();
        $extension = $media ? File::extension($media->media) : 'png';
        $allowedExtensions = ['docx','doc','docs','rar','zip','mp3','mp4','wma','aac','wav','flac','m4a','pdf'];
        if (in_array($extension, $allowedExtensions)) {
            
            $image =  $media ? asset('storage/files/sliders/' . $media->media) : null;
        }else{
            $image =  $media ? asset('storage/images/sliders/' . $media->media) : null;
        }
        return $image;
    }

    public function getImageArAttribute($key)
    {
        $media = $this->media()->whereIn('option', ['slider_ar', 'slider'])->first();
        $extension = $media ? File::extension($media->media) : 'png';
        $allowedExtensions = ['docx', 'doc', 'docs', 'rar', 'zip', 'mp3', 'mp4', 'wma', 'aac', 'wav', 'flac', 'm4a', 'pdf'];
        if (in_array($extension, $allowedExtensions)) {

            $image =  $media ? asset('storage/files/sliders/' . $media->media) : null;
        } else {
            $image =  $media ? asset('storage/images/sliders/' . $media->media) : null;
        }
        return $image;
    }

    public function getImageEnAttribute($key)
    {
        $media = $this->media()->whereIn('option', ['slider_en', 'slider'])->first();
        $extension = $media ? File::extension($media->media) : 'png';
        $allowedExtensions = ['docx', 'doc', 'docs', 'rar', 'zip', 'mp3', 'mp4', 'wma', 'aac', 'wav', 'flac', 'm4a', 'pdf'];
        if (in_array($extension, $allowedExtensions)) {

            $image =  $media ? asset('storage/files/sliders/' . $media->media) : null;
        } else {
            $image =  $media ? asset('storage/images/sliders/' . $media->media) : null;
        }
        return $image;
    }

    // Relations
    // ========================= Image ===================
    public function category()
    {
    	return $this->belongsTo(Category::class);
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

}
