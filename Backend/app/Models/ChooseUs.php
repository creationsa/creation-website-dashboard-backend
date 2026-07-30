<?php

namespace App\Models;

use App\Observers\ChooseUsObserver;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;

class ChooseUs extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    protected static function boot()
    {
        parent::boot();
        ChooseUs::observe(ChooseUsObserver::class);
    }

    protected $table = 'choose_us';
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['title', 'desc', 'slug'];

    
    
    public function getImageAttribute($key)
    {
        $media = $this->media()->where('option', 'choose_us')->first();
        $extension = $media ? File::extension($media->media) : 'png';
        $allowedExtensions = ['docx', 'doc', 'docs', 'rar', 'zip', 'mp3', 'mp4', 'wma', 'aac', 'wav', 'flac', 'm4a', 'pdf'];
        if (in_array($extension, $allowedExtensions)) {
            $image =  $media ? asset('storage/files/choose_us/' . $media->media) : null;
        } else {
            $image =  $media ? asset('storage/images/choose_us/' . $media->media) : null;
        }
        // $image = $media ? asset('storage/images/choose_us/' . $media->media) : null;
        return $image;
    }

    public function getIconAttribute()
    {
        $media = $this->media()->where('option', 'icon')->first();
        $image =  $media ? asset('storage/images/choose_us/' . $media->media) : null;
                
        return $image;
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }
}
