<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;


class AppMedia extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['alt'];

    public static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            $is_media_changed = $model->isDirty(['media', 'media_type']);
            if ($is_media_changed) {
                $media = $model->getOriginal('media');
                $path  = storage_path('app/public/' . ($model->getOriginal('media_type') == 'image' ? 'images/' : 'files/') . $model->file_name . '/' . $media);
                if (file_exists($path)) {
                    \File::delete($path);
                }
            }
        });

        static::deleting(function ($model) {
            $path  = storage_path('app/public/' . ($model->getOriginal('media_type') == 'image' ? 'images/' : 'files/') . $model->file_name . '/' . $model->media);
            if (file_exists($path)) {
                \File::delete($path);
            }
        });
    }

    public function getPathAttribute()
    {
        return $this->file_name ? asset('storage/' . ($this->media_type == 'image' ? 'images/' : 'files/') . $this->file_name . '/' . $this->media) : null;
    }

    public function getStoragePathAttribute()
    {
        return $this->file_name ? storage_path('app/public/' . ($this->media_type == 'image' ? 'images/' : 'files/') . $this->file_name . '/' . $this->media) : null;
    }

    public function getFileNameAttribute()
    {
        $map = [
            About::class                  => 'abouts',
            Country::class                => 'countries',
            Metadata::class               => 'metadata',
            User::class                   => 'users',
            Backdrop::class               => 'backdrops',
            EnvelopeBackground::class     => 'envelope_backgrounds',
            PaperBackground::class        => 'paper_backgrounds',
            Subcategory::class            => 'subcategories',
            Template::class               => 'templates',
            UserTemplate::class           => 'user_templates',
            Slider::class                 => 'sliders',
            SecondSection::class          => 'second_sections',
            ThirdSection::class           => 'third_sections',
            Cohost::class                 => 'cohosts',
            ChooseUs::class               => 'choose_us',
            Logo::class                   => 'logos',
        ];

        return $map[$this->app_mediaable_type];
    }

    public function app_mediaable()
    {
        return $this->morphTo();
    }
}
